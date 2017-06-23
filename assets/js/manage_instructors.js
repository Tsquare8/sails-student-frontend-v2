(function(){

  //function to delete record by settin id on form and then submitting the form
  //sets value of Instructor id in hidden delete form and submits form
  //not completely ideal but wanted to take advantage of flash messages in sails
  function deleteRecord(record_id){
    $("#deleteform input[name=instructor_id]").val(record_id);
    $("#deleteform").submit();
  }

  function getInstructor(record_id){
    return $.get("http://localhost:1337/instructor/" + record_id, function(data){
      console.log("got instructor");
    })
  }

  $(function(){

    //add copy, csv, etc. buttons, the ability to scroll and reorder columns
    $("#instructorTable").DataTable( {
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        colReorder: true,
        "scrollX": true
    });

//validate edits for specific fields and provide error messages
  var validator = $("#manageInstructorForm").validate({
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
        major_id: {
          required: true
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
        major_id: {
          required: "Major ID is a required field"
        }
      }
    });


    //initialize variables for items in the DOM we will work with
    let manageInstructorForm = $("#manageInstructorForm");
    let addInstructorButton = $("#addInstructorButton");

    //add instructor button functionality
    addInstructorButton.click(function(){
      //clear form so that fields do not have data in them
      $("input").val("");
       //clear error messages
      validator.resetForm();
      manageInstructorForm.attr("action", "/create_instructor");
      manageInstructorForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Submit": function() {
            //function to delete record
            manageInstructorForm.submit()
          }
        }
      });
    })

  	$("#instructorTable").on("click", "#editButton", function(e){
      let recordId = $(this).data("instructorid")
      validator.resetForm();
      manageInstructorForm.find("input[name=instructor_id]").val(recordId);
      manageInstructorForm.attr("action", "/update_instructor");
      let instructor= getInstructor(recordId);

      //populate form when api call is done (after we get instructor to edit)
      instructor.done(function(data){
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

      manageInstructorForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          Submit: function() {
            //function to delete record
            manageInstructorForm.submit()
          }
        }
      });
    })


    $("#instructorTable").on("click", "#deleteButton", function(e){
      let recordId = $(this).data("instructorid")
      $("#deleteConfirm").dialog({
        title: "Confirm Delete",
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Delete Instructor": function() {
            //function to delete record
            deleteRecord(recordId);
          }
        }
      });
    })

  })

})();
