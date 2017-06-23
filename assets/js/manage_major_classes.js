(function(){

  //function to delete record by settin id on form and then submitting the form
  //sets value of major class id in hidden delete form and submits form
  //not completely ideal but wanted to take advantage of flash messages in sails
  function deleteRecord(record_id){
    $("#deleteform input[name=major_class_id]").val(record_id);
    $("#deleteform").submit();
  }

  function getMajorClass(record_id){
    return $.get("http://localhost:1337/major_class/" + record_id, function(data){
      console.log("got major class");
    })
  }

  $(function(){

    //add copy, csv, etc. buttons, the ability to scroll and reorder columns
    $("#majorClassTable").DataTable( {
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        colReorder: true,
        "scrollX": true
    });

//validate edits for specific fields and provide error messages
  var validator = $("#manageMajorClassForm").validate({
      // debug: true,
      errorClass: "text-danger",
      rules: {
        major_id: {
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
    let manageMajorClassForm = $("#manageMajorClassForm");
    let addMajorClassButton = $("#addMajorClassButton");

    //add major class button functionality
    addMajorClassButton.click(function(){
      //clear form so that fields do not have data in them
      $("input").val("");
      //clear error messages
      validator.resetForm();
      manageMajorClassForm.attr("action", "/create_major_class");
      manageMajorClassForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Submit": function() {
            //function to delete record
            manageMajorClassForm.submit()
          }
        }
      });
    })

  	$("#majorClassTable").on("click", "#editButton", function(e){
      let recordId = $(this).data("majorclassid")
      validator.resetForm();
      manageMajorClassForm.find("input[name=major_class_id]").val(recordId);
      manageMajorClassForm.attr("action", "/update_major_class");
      let majorClass = getMajorClass(recordId);

      //populate form when api call is done (after we get major class to edit)
      majorClass.done(function(data){
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

      manageMajorClassForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          Submit: function() {
            //function to delete record
            manageMajorClassForm.submit()
          }
        }
      });
    })


    $("#majorClassTable").on("click", "#deleteButton", function(e){
      let recordId = $(this).data("majorclassid")
      $("#deleteConfirm").dialog({
        title: "Confirm Delete",
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Delete Major Class": function() {
            //function to delete record
            deleteRecord(recordId);
          }
        }
      });
    })

  })

})();
