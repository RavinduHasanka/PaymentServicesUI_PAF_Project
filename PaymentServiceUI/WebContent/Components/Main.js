$(document).ready(function() {
	if ($("#alertSuccess").text().trim() == "") {
		$("#alertSuccess").hide();
	}
	$("#alertError").hide();
	refresh();

});
// SAVE ============================================
$(document)
		.on(
				"click",
				"#btnSave",
				function(event) {
					// Clear alerts---------------------
					$("#alertSuccess").text("");
					$("#alertSuccess").hide();
					$("#alertError").text("");
					$("#alertError").hide();
					
					// Form validation-------------------
					var status = validateItemForm();
					
					// Form not validation-------------------
					
					if (status != true) {
						$("#alertError").text(status);
						$("#alertError").show();
						return;
					}

					var formObj = $("#formPayment")
					var payment = {}
					payment["Cnumber"] = formObj.find("#CNumber").val().trim()
					
					payment["CHname"] = formObj.find("#CHName").val().trim()
					
					payment["cvc"] = formObj.find("#Cvc").val().trim()
					
					payment["cardtype"] = formObj.find("#cardType").val().trim()
					
					payment["exp"] = formObj.find("#Exp").val().trim()
					
					payment["amount"] = formObj.find("#Amount").val().trim()
					
					payment["pday"] = formObj.find("#Pday").val().trim()


					var type = ($("#hidItemIDSave").val() == "") ? "POST"
							: "PUT";
					serviceUrl = "jdbc:mysql://localhost:3306/gadget_badget/Payment/"
					if (type == "PUT") {
						serviceUrl = "jdbc:mysql://localhost:3306/gadget_badget/Payment/"
								+ $("#hidItemIDSave").val().trim()
					}
					
					$.ajax({
						url : serviceUrl,
						type : type,
						data : JSON.stringify(payment),
						contentType : "application/json",
						beforeSend : function(xhr) {
							xhr.setRequestHeader("Authorization", "Basic "
									+ btoa("admin" + ":" + "admin"));
						},
						complete : function(response, status) {
							onItemSaveComplete(response.responseText, status);
						}
					});
				});


// UPDATE==========================================
$(document)
		.on(
				"click",
				".btnUpdate",
				function(event) {
					$("#heading").text("Update Payment")
					$("#hidItemIDSave").val(
							$(this).closest("tr").find('#hidItemIDUpdate')
									.val());
					$("#CNumber").val(
							$(this).closest("tr").find('td:eq(0)').text());
					$("#CHName").val(
							$(this).closest("tr").find('td:eq(1)').text());
					$("#Cvc").val(
							$(this).closest("tr").find('td:eq(2)').text());
					$("#cardType").val(
							$(this).closest("tr").find('td:eq(3)').text());
					$("#Exp").val(
							$(this).closest("tr").find('td:eq(4)').text());
					$("#Amount").val(
							$(this).closest("tr").find('td:eq(5)').text());
					$("#Pday").val(
							$(this).closest("tr").find('td:eq(6)').text());
				});

//DELETE==========================================
$(document)
		.on(
				"click",
				".btnRemove",
				function(event) {
					var r = confirm("Do you want to delete this record");
					if (r == true) {
						serviceUrl = "jdbc:mysql://localhost:3306/gadget_badget/Payment/"
				//				+ $(this).data("id")
						$.ajax({
							url : serviceUrl,
							type : "DELETE",
							data : "{d_ID : " + $(this).data("id") +"}",
							contentType : "application/json",
							beforeSend : function(xhr) {
								xhr.setRequestHeader("Authorization", "Basic "
										+ btoa("admin" + ":" + "admin"));
							},
							complete : function(response, status) {
								onItemDeleteComplete(response.responseText,
										status);
								console.log(status)
							}

						});
					}
				});



// CLIENTMODEL=========================================================================
function validateItemForm() {
	// Card Number
	if ($("#CNumber").val().trim() == "") {
		return "Insert Card Number.";
	}
	// Card Holder Name
	if ($("#CHName").val().trim() == "") {
		return "Insert Card Holder Name.";
	}

	// CVC-------------------------------
	if ($("#Cvc").val().trim() == "") {
		return "Insert CVC.";
	}
	
	// expire month/year-------------------------------
	if ($("#Exp").val().trim() == "") {
		return "Insert Contact Expire Month and Year.";
	}
	
	// Card Type------------------------
	if ($("#cardType").val().trim() == "") {
		return "Select a Card Type.";
	}
		
	// amount
	if ($("#Amount").val().trim() == "") {
		return "Insert Amount.";
	}
	
	// Payment Date
	if ($("#Pday").val().trim() == "") {
		return "Payment Date.";
	}
	
	// is numerical value check
	var Amount = $("#Amount").val().trim();
	var CardNumber = $("#CNumber").val().trim();
	var CVC = $("#Cvc").val().trim();
	
	if (!$.isNumeric(Amount)) {
		return "Amount should be numeric.";
	}

	if (!$.isNumeric(CardNumber)) {
		return "Card Number should be numeric.";
	}
		if(!$.isNumeric(CVC)){
		return "CVC should be numeric.";
	}

	return true;
}


function onItemSaveComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	$("#hidItemIDSave").val("");
	$("#formpayment")[0].reset();
	$("#heading").text("Create Payment");
	refresh();

}

function onItemDeleteComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
	refresh()
}

function viewpayments(data) {
	$("#paymentTable tbody").empty();
	var content = ""
	$
			.each(
					data,
					function(index, obj) {
						content += "<tr><td><input id='hidItemIDUpdate' name='hidItemIDUpdate' type='hidden' value='"
								+ obj["id"] + "'>" + obj["Cnumber"] + "</td>";
						content += "<td>" + obj["CHname"] + "</td>" +
								   "<td>" + obj["cvc"] + "</td>" +
								   "<td>" + obj["exp"]	+ "</td>" +
								   "<td>" + obj["cardtype"] + "</td>" +
								   "<td>" + obj["amount"] + "</td>" +
								   "<td>" + obj["pday"] + "</td><td>";
								
								
								
						content += "<td><input name='btnUpdate' type='button' value='Update' class='btnUpdate btn btn-success'></td>"
								+ "<td><input name='btnRemove' type='button' value='Remove' class='btnRemove btn btn-danger' data-id='"
								+ obj["id"] + "'>" + "</td></tr>";
					});

	$("#paymentTable tbody").append(content);
}





function refresh() {

	serviceUrl = "jdbc:mysql://localhost:3306/gadget_badget/Payment/"
	$.ajax({
		dataType : 'json',
		url : serviceUrl,
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Authorization", "Basic "
					+ btoa("admin" + ":" + "admin"));
		},
		success : function(data) {
			viewpayments(data)
		}
	});

}
