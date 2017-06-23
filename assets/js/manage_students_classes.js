(function(){

  //function to delete record by settin id on form and then submitting the form
  //sets value of student class id in hidden delete form and submits form
  //not completely ideal but wanted to take advantage of flash messages in sails
  function deleteRecord(record_id){
    $("#deleteform input[name=student_class_id]").val(record_id);
    $("#deleteform").submit();
  }

  function getStudentClass(record_id){
    return $.get("http://localhost:1337/student_class/" + record_id, function(data){
      console.log("got student class");
    })
  }

  $(function(){

//add copy, csv, etc. buttons, the ability to scroll and reorder columns
    var validator = $("#studentClassTable").DataTable( {
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        colReorder: true,
        "scrollX": true
    });

//validate edits for specific fields and provide error messages
  var validator = $("#manageStudentClassForm").validate({
      // debug: true,
      errorClass: "text-danger",
      rules: {
        student_id: {
          required: true
        },
        class_id: {
          required: true
        }
      },
      messages: {
        student_id: {
          required: "Student ID is required"
        },
        class_id: {
          required: "Class ID is required"
        }
      }
    });

    //add code from frontend v1
    //initialize variables for items in the DOM we will work with
    let manageStudentClassForm = $("#manageStudentClassForm");
    let addStudentClassButton = $("#addStudentClassButton");

    //add student class button functionality
    addStudentClassButton.click(function(){
      //clear form so that fields do not have data in them
      $("input").val("");
      //clear error messages
      validator.resetForm();
      manageStudentClassForm.attr("action", "/create_student_class");
      manageStudentClassForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Submit": function() {
            //function to delete record
            manageStudentClassForm.submit()
          }
        }
      });
    })

  	$("#studentClassTable").on("click", "#editButton", function(e){
      let recordId = $(this).data("studentclassid")
      validator.resetForm();
      manageStudentClassForm.find("input[name=student_class_id]").val(recordId);
      manageStudentClassForm.attr("action", "/update_student_class");
      let studentClass = getStudentClass(recordId);

      //populate form when api call is done (after we get student class to edit)
      studentClass.done(function(data){
        $.each(data, function(name, val){
            var $el = $('[name="'+name+'"]'),
                type = $el.attr('type');

            switch(type){
                case 'checkbox':
                    $el.attr('checked', 'checked');
                    break;
                case 'radio':
                    $el.filter('[value="'+val+'"]').attr('checked', 'checked');
                    break;
                default:
                    $el.val(val);
            }
        });
      })

      manageStudentClassForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          Submit: function() {
            //function to delete record
            manageStudentClassForm.submit()
          }
        }
      });
    })


    $("#studentClassTable").on("click", "#deleteButton", function(e){
      let recordId = $(this).data("studentclassid")
      $("#deleteConfirm").dialog({
        title: "Confirm Delete",
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Delete Student Class": function() {
            //function to delete record
            deleteRecord(recordId);
          }
        }
      });
    })

  })

})();
