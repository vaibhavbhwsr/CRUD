// Insert data
$("#btnsave").click(function() {
    // console.log("Save Button Clicked");
    let output = "";
    let sid = $("#stuid").val();
    let nm = $("#nameid").val();
    let em = $("#emailid").val();
    let pw = $("#passwordid").val();
    let csrf = $('input[name=csrfmiddlewaretoken]').val();

    let mydata;
    if (nm === "") {
        $('#msg').text("Please Enter Name.");
        $('#msg').show();
        // console.log("Please Enter Name.");
    } else if (em === "") {
        $('#msg').text("Please Enter Email.");
        $('#msg').show();
        // console.log("Please Enter Email.");
    } else if (pw === "") {
        $('#msg').text("Please Enter Password.");
        $('#msg').show();
        // console.log("Please Enter Password.");
    } else {
        // console.log(nm, em, pw);
        mydata = {
            stuid: sid,
            name: nm,
            email: em,
            password: pw,
            csrfmiddlewaretoken: csrf,
        };
        $.ajax({
            url: "{% url 'save' %}",
            method: "POST",
            data: mydata,
            success: function(data) {
                // console.log(data); just to check data in console
                let x = data.student_data;
                if (data.status === "save") {
                    $('#msg').text("Form Submitted Successfully");
                    $('#msg').show();
                    // console.log("Form Submitted Successfully");
                    // console.log(data.student_data);
                    for (let i = 0; i < x.length; i++) {
                        output +=
                            "<tr> <td>" +
                            x[i].id +
                            "</td><td>" +
                            x[i].name +
                            "</td><td>" +
                            x[i].email +
                            "</td><td>" +
                            x[i].password +
                            "</td><td> <input type='button' class='btn btn-warning btn-sm bnt-edit' value='Edit' data-sid=" + x[i].id +
                            "> <input type='button' class='btn btn-danger btn-sm btn-del' value='Delete' data-sid=" + x[i].id + ">";
                    }
                    $('#tbody').html(output);
                    $('#stuid').val('');
                    $("form")[0].reset();
                }
                if (data.status === 0) {
                    $('#msg').text("Unable To Save Data");
                    $('#msg').show();
                    $('#stuid').val('');
                    $("form")[0].reset();

                }
            },
        });
    }
});


// Delete Button
$('#tbody').on('click', '.btn-del', function() {
    // console.log('Delete button clicked');
    let id = $(this).attr('data-sid');
    let csr = $('input[name=csrfmiddlewaretoken').val();
    let mythis = this;

    // console.log(id);
    let mydata = { sid: id, csrfmiddlewaretoken: csr };
    $.ajax({
        url: "{% url 'delete' %}",
        method: "POST",
        data: mydata,
        dataType: "json",
        success: function(data) {
            // console.log(data);
            if (data.status === 1) {
                $('#msg').text("Deleted Data Successfully");
                $('#msg').show();
                $(mythis).closest('tr').fadeOut();
            }
            if (data.status === 0) {
                $('#msg').text("Unable to Deleted Data.");
                $('#msg').show();
                // console.log("Can't able to delete!");
            }
        },

    });
});


// Edit Data
$('#tbody').on('click', '.btn-edit', function() {
    // console.log('Edit button clicked');

    let id = $(this).attr('data-sid');
    let csr = $('input[name=csrfmiddlewaretoken').val();

    let mydata = { sid: id, csrfmiddlewaretoken: csr };
    $.ajax({
        url: "{% url 'edit' %}",
        method: "POST",
        data: mydata,
        dataType: "json",
        success: function(data) {
            // console.log("Data Edited Successfully");
            // console.log(data);
            $('#stuid').val(data.id); /*For this a input field is created in base.html to pass id to edit */
            $('#nameid').val(data.name);
            $('#emailid').val(data.email);
            $('#passwordid').val(data.password);
        },
    });
});
