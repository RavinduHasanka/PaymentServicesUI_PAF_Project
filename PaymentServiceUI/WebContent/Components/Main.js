$(document).ready(function() {
	if ($("#alertSuccess").text().trim() == "") 
	{
		$("#alertSuccess").hide();
	}
	$("#alertError").hide();
	

});

// SAVE ============================================
//$(document)
//		.on( "click","#btnSave",function(event) 
//				{
//					// Clear alerts---------------------
//					$("#alertSuccess").text("");
//					$("#alertSuccess").hide();
//					$("#alertError").text("");
//					$("#alertError").hide();
//					
//					// Form validation-------------------
//					var status = validateItemForm();
//					if (status != true) 
//					{
//						$("#alertError").text(status);
//						$("#alertError").show();
//						return;
//					}
//
//					// If Valid -------------------------
//					var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT";					
//					$.ajax({
//						url : "PaymentServiceAPI",
//						type : type,
//						data : $("#formPayment").serialize(),
//						dataType : "text",
//						
//					complete : function(response, status) {
//							onItemSaveComplete(response.responseText, status);
//						}
//					});
//				});

$(document).on("click", "#btnSave", function(event)
		{
			
			// Clear alerts---------------------

			 $("#alertSuccess").text("");
			 $("#alertSuccess").hide();
			 $("#alertError").text("");
			 $("#alertError").hide();


			// Form validation-------------------
			
			var status = validateItemForm();
			if (status != true)
			 {
				 $("#alertError").text(status);
				 $("#alertError").show();
				 return;
			 }


			//If valid------------------------
			
			var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT";
			 $.ajax(
			 {
				 url : "PaymentServiceAPI",
				 type : type,
				 data : $("#formPayment").serialize(),
				 dataType : "text",
			
			complete : function(response, status)
			 {
			 	onItemSaveComplete(response.responseText, status);
			 }
			 });
			});

// UPDATE==========================================
$(document)
		.on("click",".btnUpdate",function(event) 
				{
					$("#hidItemIDSave").val($(this).data("payment"));
					$("#amount").val($(this).closest("tr").find('td:eq(0)').text());
					$("#payment_date").val(	$(this).closest("tr").find('td:eq(1)').text());
					$("#card_number").val($(this).closest("tr").find('td:eq(2)').text());
					$("#expire_mon_yer").val($(this).closest("tr").find('td:eq(3)').text());
					$("#cvc").val(	$(this).closest("tr").find('td:eq(4)').text());
					$("#card_holder_name").val($(this).closest("tr").find('td:eq(5)').text());
					$("#type").val(	$(this).closest("tr").find('td:eq(6)').text());
					
					
				});

//DELETE==========================================
$(document)
		.on("click",".btnRemove",function(event)
				{
					$.ajax({
							url : "PaymentServiceAPI",
							type : "DELETE",
							data : "paymentID=" + $(this).data("payment"),
							dataType : "text",
							
					complete : function(response, status) 
						{
								onItemDeleteComplete(response.responseText,status);
						}
						});
				});



// CLIENTMODEL=========================================================================
function validateItemForm() {
	// Card Number
	if ($("#card_number").val().trim() == "") {
		return "Insert Card Number.";
	}
	// Card Holder Name
	if ($("#card_holder_name").val().trim() == "") {
		return "Insert Card Holder Name.";
	}

	// CVC-------------------------------
	if ($("#cvc").val().trim() == "") {
		return "Insert CVC.";
	}
	
	// expire month/year-------------------------------
	if ($("#expire_mon_yer").val().trim() == "") {
		return "Insert Contact Expire Month and Year.";
	}
	
	// Card Type------------------------
	if ($("#type").val().trim() == "") {
		return "Select a Card Type.";
	}
		
	// amount
	if ($("#amount").val().trim() == "") {
		return "Insert Amount.";
	}
	
	// Payment Date
	if ($("#payment_date").val().trim() == "") {
		return "Payment Date.";
	}
	
	// is numerical value check
	var Amount = $("#amount").val().trim();
	var CardNumber = $("#card_number").val().trim();
	var CVC = $("#cvc").val().trim();
	
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


function onItemSaveComplete(response, status)
{
	if (status == "success")
	 {
		 var resultSet = JSON.parse(response);
		 if (resultSet.status.trim() == "success")
		 {
			 $("#alertSuccess").text("Successfully saved.");
			 $("#alertSuccess").show();
			 $("#divItemsGrid").html(resultSet.data);
		
		 } else if (resultSet.status.trim() == "error")
		 {
			 $("#alertError").text(resultSet.data);
			 $("#alertError").show();
		 }
	
	 } else if (status == "error")
	 {
		 $("#alertError").text("Error while saving.");
		 $("#alertError").show();
	 } else
	 {
		 $("#alertError").text("Unknown error while saving..");
		 $("#alertError").show();
	 } 
	
		$("#hidItemIDSave").val("");
}


function onItemDeleteComplete(response, status)
{
	if (status == "success")
	 {
		 var resultSet = JSON.parse(response);
		 if (resultSet.status.trim() == "success")
		 {
			 $("#alertSuccess").text("Successfully deleted.");
			 $("#alertSuccess").show();
			 $("#divItemsGrid").html(resultSet.data);
		
		 } else if (resultSet.status.trim() == "error")
		 {
			 $("#alertError").text(resultSet.data);
			 $("#alertError").show();
		 }
	
	 } else if (status == "error")
	 {
		 $("#alertError").text("Error while deleting.");
		 $("#alertError").show();
	
	 } else
	 {
		 $("#alertError").text("Unknown error while deleting..");
		 $("#alertError").show();
	 }
}


