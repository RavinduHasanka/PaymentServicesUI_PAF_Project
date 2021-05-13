<%@page import="model.PaymentService"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>GadgetBadget System</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.3.1.min.js"></script>
<script src="Components/Main.js"></script>
</head>
<body>
<div class="container">
		<div class="row">
			<div class="col-md-4">
			
				<!-- Insert Payment details -->
				
				<h1 id="heading">Insert Payment Details</h1>

				<form id="formPayment" name="formPayment">
				
					Card Number:<input id="card_number" name="card_number" type="number"
						class="form-control form-control-sm"> <br>
						 
					Card Holder Name: <input id="card_holder_name" name="card_holder_name" type="text"
						class="form-control form-control-sm"> <br> 
				
					CVC: <input id="cvc" name="cvc" type="number" placeholder="XXX"
						class="form-control form-control-sm"> <br> 
				
					Card Expire Month/Year: <input id="expire_mon_yer" name="expire_mon_yer" type="text" placeholder="MM/YY"
						class="form-control form-control-sm"> <br>
						
					Card Type: <input id="type" name="type" type="text" placeholder="Credit Card / Debit Card"
						class="form-control form-control-sm"> <br>
				
					Amount: <input id="amount" name="amount" type="number" 
						class="form-control form-control-sm"> <br>
				
					Payment Date: <input type="text" id="payment_date" name="payment_date" 
						class="form-control form-control-sm"> <br>						

					 <br> 
					 <input id="btnSave" name="btnSave" type="button" value="Save User Details"	 class="btn btn-primary btn-block">
		 			 <input type="hidden" id="hidItemIDSave" name="hidItemIDSave" value="">
				</form>
				<div id="alertSuccess" class="alert alert-success"></div>
				<div id="alertError" class="alert alert-danger"></div>
				<br>

			</div>
			<div class="col-md-8">

				<!-- Payment Table details -->
				<h2>Payment Table</h2>
					<p>Available Payment In The System</p>
						<div id="divItemsGrid">
						 <%
							 PaymentService paymentObj = new PaymentService();
							 out.print(paymentObj.readPaymentDetails());
						 %>
				</div>			
			</div>
		</div>
	</div>
</body>
</html>