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
				
					Card Number:<input id="Cnumber" name="Cnumber" type="number"
						class="form-control form-control-sm"> <br>
						 
					Card Holder Name: <input id="CHName" name="CHName" type="text"
						class="form-control form-control-sm"> <br> 
				
					CVC: <input id="cvc" name="cvc" type="number" placeholder="XXX"
						class="form-control form-control-sm"> <br> 
				
					Card Expire Month/Year: <input id="exp" name="exp" type="text" placeholder="MM/YY"
						class="form-control form-control-sm"> <br>
						
					Card Type: <select class="form-control form-control-sm" id='cardType'
						name="cardType">
						<option selected value=''>--Select Card Type--</option>
						<option value='Master'>Credit Card</option>
						<option value='Debit'>Debit Card</option>	
						</select><br>
				
					Amount: <input id="amount" name="amount" type="number" 
						class="form-control form-control-sm"> <br>
				
					Payment Date: <input type="date" id="pday" name="pday" 
						class="form-control form-control-sm"> <br>						

					 <br> <input id="btnSave" name="btnSave" type="button"
						value="Save" class="btn btn-primary"> <input type="hidden"
						id="hidItemIDSave" name="hidItemIDSave" value="">
				</form>
				<div id="alertSuccess" class="alert alert-success"></div>
				<div id="alertError" class="alert alert-danger"></div>
				<br>

			</div>
			<div class="col-md-8">
			
			<!-- Payment Table details -->
				<div class="container">
					<h2>Payment Table</h2>
					<p>Available Payment In The System</p>
					<table class="table table-striped" id="paymentTable">
						<thead>
							<tr>
								<th>Card Number</th>
								<th>Card Holder Name</th>
								<th>CVC</th>
								<th>Card Type</th>
								<th>Expire MM/YY </th>
								<th>Amount</th>
								<th>Payment Date</th>
								<th>Update</th>
								<th>Remove</th>
							</tr>
						</thead>
						<tbody>
							
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</body>
</html>