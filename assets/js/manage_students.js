(function(){

  //function to delete record by settin id on form and then submitting the form
  //sets value of student id in hidden delete form and submits form
  //not completely ideal but wanted to take advantage of flash messages in sails
  function deleteRecord(record_id){
    $("#deleteform input[name=student_id]").val(record_id);
    $("#deleteform").submit();
  }

  function getStudent(record_id){
    return $.get("http://localhost:1337/student/" + record_id, function(data){
      console.log("got student");
    })
  }

$(function(){

//add copy, csv, etc. buttons, the ability to scroll and reorder columns
    $("#studentTable").DataTable( {
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        colReorder: true,
        "scrollX": true
    });

//validate edits for specific fields and provide error messages
  var validator = $("#manageStudentForm").validate({
      // debug: true,
      errorClass: "text-danger",
      rules: {
        first_name: {
          required: true,
          minlength: 2
        },
        last_name: {
          required: true,
          minlength: 2
        },
        start_date: {
          required: true,
          dateISO: true
        },
        sat: {
          maxlength: 4
        }
      },
      messages: {
        first_name: {
          required: "First name is a required field",
          minlength: "First name needs to have at least 2 characters"
        },
        last_name: {
          required: "Last name is a required field",
          minlength: "First name needs to have at least 2 characters"
        },
        start_date: {
          required: "Start_date is a required field"
        },
        sat: {
          maxlength: "SAT is a maximum of 4 characters"
        }
      }
    });

  // $(function(){
    //add code from frontend v1
    //initialize variables for items in the DOM we will work with
    let manageStudentForm = $("#manageStudentForm");
    let addStudentButton = $("#addStudentButton");

    //add student button functionality
    addStudentButton.click(function(){
      //clear form so that fields do not have data in them
      $("input").val("");
       //clear error messages
      validator.resetForm();
      manageStudentForm.attr("action", "/create_student");
      manageStudentForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Submit": function() {
            //function to delete record
            manageStudentForm.submit()
          }
        }
      });
    });
      

  	$("#studentTable").on("click", "#editButton", function(e){
      let recordId = $(this).data("studentid")
      validator.resetForm();
      manageStudentForm.find("input[name=student_id]").val(recordId);
      manageStudentForm.attr("action", "/update_student");
      let student = getStudent(recordId);

      //populate form when api call is done (after we get student to edit)
      student.done(function(data){
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

      manageStudentForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          Submit: function() {
            //function to delete record
            manageStudentForm.submit()
          }
        }
      });
    })


    $("#studentTable").on("click", "#deleteButton", function(e){
      let recordId = $(this).data("studentid")
      $("#deleteConfirm").dialog({
        title: "Confirm Delete",
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Delete Student": function() {
            //function to delete record
            deleteRecord(recordId);
          }
        }
      });
    })

  })

})();
