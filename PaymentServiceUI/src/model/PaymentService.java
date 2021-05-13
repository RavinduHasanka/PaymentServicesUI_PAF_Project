package model;

import java.sql.*;


public class PaymentService {
	
		//Connect to the DB
		private Connection connect() {
			Connection con = null;
			
			try {
				Class.forName("com.mysql.jdbc.Driver");
				
				con = DriverManager.getConnection("jdbc:mysql://localhost:3306/gadget_badget", "root", "");
			}
			
			catch(Exception e) 
			{
				e.printStackTrace();
			}
			
			return con;
		}
		
		//Insert Payment Details Method
		public String insertPaymentDetails(String amount, String payment_date, String card_number, String expire_mon_yer, String cvc, String card_holder_name, String type) {
			
			String result = "";
			
			/*
			//validation for card No & Card Verification Code
			String cardNoValid = "^[0-9]{16}$";
			String cvcValid = "^[0-9]{3}$";
			
			if(amount.isEmpty() || payment_date.isEmpty() || card_number.isEmpty() || expire_mon_yer.isEmpty() || cvc.isEmpty() || card_holder_name.isEmpty() || type.isEmpty()) {
				result = "Cannot Insert Empty Fields! ";
			}
			else if(!(card_number.matches(cardNoValid))) 
				{
				result = "Invalid Card Number!";
				}
			else if(!(cvc.matches(cvcValid))) 
				{
				result = "Invalid cvc!";
				}
			else if(card_holder_name.length()> 10)
				{
				result = "Card Holder Name Characters is exceeded ! Try Again";
				}
			else
				{*/
			
				try {
					Connection con = connect();
					
					if (con == null) {
						return "Error while connecting to the database for inserting.";
					}
					
					//Insert query 
					String query = "insert into payment (`paymentID`, `amount`,`payment_date`,`card_number`,`expire_mon_yer`, `cvc`,`card_holder_name`,`type`) values (?, ?, ?, ?, ?, ?, ?, ?) ";
					
					PreparedStatement preparedStat = con.prepareStatement(query);
					
					preparedStat.setInt(1, 0);
					preparedStat.setString(2, amount);
					preparedStat.setString(3, payment_date);
					preparedStat.setString(4, card_number);
					preparedStat.setString(5, expire_mon_yer);
					preparedStat.setString(6, cvc);
					preparedStat.setString(7, card_holder_name);
					preparedStat.setString(8, type);
					
					preparedStat.execute();
					con.close();
					
					//result = "Insert Successfully";
					String newPayment = readPaymentDetails();
					 result = "{\"status\":\"success\", \"data\": \"" + newPayment + "\"}";
				}
				
				catch(Exception e) 
				{
					//result = "Error while inserting the payment.";
					//System.err.println(e.getMessage());
					
					result = "{\"status\":\"error\", \"data\":\"Error while inserting the Payment.\"}";
					 System.err.println(e.getMessage());
				}
			//}
				return result;
				
			
		}
		
		//Read Payment Details Method
		public String readPaymentDetails() {
			
			String result = "";
			
			try {
				Connection con = connect();
				
				if (con == null) 
				{
					return "Error while connecting to the database for reading.";
				}
				
				result = "<table border = '1'> <tr>"
						+ "<th>Amount</th> "
						+ "<th>Payment Date</th>"
						+ "<th>Card Number</th> "
						+ "<th>Expire Month/Year</th> "
						+ "<th>CVC</th> "
						+ "<th>Card Holder Name</th> "
						+ "<th>Type</th> "
						+ "<th>Update</th> <th>Remove</th> </tr>";
				
				String query = "select * from payment";
				Statement state = con.createStatement();
				ResultSet rs = state.executeQuery(query);
				
				while (rs.next()) 
				{
					String paymentID = Integer.toString(rs.getInt("paymentID"));
					String amount = rs.getString("amount");
					String payment_date = rs.getString("payment_date");
					String card_number = rs.getString("card_number");
					String expire_mon_yer = rs.getString("expire_mon_yer");
					String cvc = rs.getString("cvc");
					String card_holder_name = rs.getString("card_holder_name");
					String type = rs.getString("type");
					
					result += "<tr><td>" + amount + "</td>";
					result += "<td>" + payment_date + "</td>";
					result += "<td>" + card_number + "</td>";
					result += "<td>" + expire_mon_yer + "</td>";
					result += "<td>" + cvc + "</td>";
					result += "<td>" + card_holder_name + "</td>";
					result += "<td>" + type + "</td>";
								
					
					/*result += "<td> <input type = 'button' name = 'btn update' value = 'Update' class = 'btn btn-secondary'> </td>" 
							+ "<td> <form method = 'post' action = 'items.jsp'> "
							+ "<input type = 'submit' name = 'btnRemove' value = 'Remove' class = 'btn btn-danger'>"
							+ "<input type = 'hidden' name = 'paymentID' value = '" + paymentID + "'> "
							+ "</form></td></tr>"; */
					
					result += "<td><input name='btnUpdate' type='button' value='Update' "
							 + "class='btnUpdate btn btn-secondary' data-payment ='" + paymentID + "'></td>"
							 + "<td><input name='btnRemove' type='button' value='Remove' "
							 + "class='btnRemove btn btn-danger' data-payment ='" + paymentID + "'></td></tr>";
						
					
				}
				
				con.close();
				
				result += "</table>";
				
			}
			
			catch(Exception e) 
			{
				result = "Error while reading the payment.";
				System.err.println(e.getMessage());
			}
			
			return result;
			
		}
		
		//Update Payment Details Method
		public String updatePaymentDetails(String paymentID , String amount, String payment_date, String card_number, String expire_mon_yer, String cvc, String card_holder_name, String type) {
			
			String result = "";
			
			/*
			//validation for card No & Card Verification Code
			String cardNoValid = "^[0-9]{16}$";
			String cvcValid = "^[0-9]{3}$";
			
			if(amount.isEmpty() || payment_date.isEmpty() || card_number.isEmpty() || expire_mon_yer.isEmpty() || cvc.isEmpty() || card_holder_name.isEmpty() || type.isEmpty()) {
				result = "Cannot Insert Empty Fields! ";
			}
			else if(!(card_number.matches(cardNoValid))) 
				{
				result = "Invalid Card Number!";
				}
			else if(!(cvc.matches(cvcValid))) 
				{
				result = "Invalid cvc!";
				}
			else if(card_holder_name.length()> 10)
				{
				result = "Card Holder Name Characters is exceeded ! Try Again";
				}
			else
				{ */
			
				try {
					Connection con = connect();
					
					if (con == null) 
					{
						return "Error while connecting to the database for updating.";
					}
					
					//Update query
					String query = "update payment set amount=?, payment_date=?, card_number=?, expire_mon_yer=?, cvc=?, card_holder_name=?,type=? where paymentID=?";
					
					PreparedStatement preparedStat = con.prepareStatement(query);
					
					preparedStat.setString(1, amount);
					preparedStat.setString(2, payment_date);
					preparedStat.setString(3, card_number);
					preparedStat.setString(4, expire_mon_yer);
					preparedStat.setString(5, cvc);
					preparedStat.setString(6, card_holder_name);
					preparedStat.setString(7, type);
					preparedStat.setInt(8, Integer.parseInt(paymentID));
					
					preparedStat.execute();
					con.close();
					
					//result = "Update Successfully";
					
					String newPayment = readPaymentDetails();
					 result = "{\"status\":\"success\", \"data\": \"" + newPayment + "\"}";
					
				}
				
				catch(Exception e) 
				{
					//result = "Error while updating the Payment.";
					//System.err.println(e.getMessage());
					
					result = "{\"status\":\"error\", \"data\":\"Error while updating the payment.\"}";
					 System.err.println(e.getMessage()); 
				}
			//}	
			return result;
		}
		
		//Delete Payment Details Method
		public String deletePaymentDetails (String paymentID) {
			
			String result = "";
			
			try {
				Connection con = connect();
				
				if (con == null) 
				{
					return "Error while connecting to the database for deleting.";
				} 
				
				//Delete query
				String query = "delete from payment where paymentID=?";
				
				PreparedStatement preparedStat = con.prepareStatement(query);
				
				preparedStat.setInt(1, Integer.parseInt(paymentID));
				
				preparedStat.execute();
				con.close();
				
				//result = "Deleted Successfully";
				String newPayment = readPaymentDetails();
				 result = "{\"status\":\"success\", \"data\": \"" + newPayment + "\"}";
				
			}
			
			catch(Exception e) 
			{	
//				result = "Error while deleting the payment.";
//				System.err.println(e.getMessage());
				
				result = "{\"status\":\"error\", \"data\":\"Error while updating the payment.\"}";
				 System.err.println(e.getMessage());
			}
			
			return result;
		}
	
}

