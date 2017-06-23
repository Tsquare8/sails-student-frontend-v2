(function(){

  //function to delete record by settin id on form and then submitting the form
  //sets value of grade_id id in hidden delete form and submits form
  //not completely ideal but wanted to take advantage of flash messages in sails
  function deleteRecord(record_id){
    $("#deleteform input[name=grade_id]").val(record_id);
    $("#deleteform").submit();
  }

  function getGrade(record_id){
    return $.get("http://localhost:1337/grade/" + record_id, function(data){
      console.log("got grade");
    })
  }

  $(function(){

    //add copy, csv, etc. buttons, the ability to scroll and reorder columns
    $("#gradeTable").DataTable( {
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        colReorder: true,
        "scrollX": true
    });

//validate edits for specific fields and provide error messages
  var validator = $("#manageGradeForm").validate({
      // debug: true,
      errorClass: "text-danger",
      rules: {
        grade: {
          required: true
        }
      },
      messages: {
        grade: {
          required: "Grade is required"
        }
      }
    });

    //add code from frontend v1
    //initialize variables for items in the DOM we will work with
    let manageGradeForm = $("#manageGradeForm");
    let addGradeButton = $("#addGradeButton");

    //add grade button functionality
    addGradeButton.click(function(){
      //clear form so that fields do not have data in them
      $("input").val("");
      //clear error messages
      validator.resetForm();
      manageGradeForm.attr("action", "/create_grade");
      manageGradeForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Submit": function() {
            //function to delete record
            manageGradeForm.submit()
          }
        }
      });
    })

  	$("#gradeTable").on("click", "#editButton", function(e){
      let recordId = $(this).data("gradeid")
      validator.resetForm();
      manageGradeForm.find("input[name=grade_id]").val(recordId);
      manageGradeForm.attr("action", "/update_grade");
      let grade = getGrade(recordId);

      //populate form when api call is done (after we get grade to edit)
      grade.done(function(data){
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

      manageGradeForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          Submit: function() {
            //function to delete record
            manageGradeForm.submit()
          }
        }
      });
    })


    $("#gradeTable").on("click", "#deleteButton", function(e){
      let recordId = $(this).data("gradeid")
      $("#deleteConfirm").dialog({
        title: "Confirm Delete",
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Delete Grade": function() {
            //function to delete record
            deleteRecord(recordId);
          }
        }
      });
    })

  })

})();
