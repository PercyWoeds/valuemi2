class ActionCorreo < ApplicationMailer
  	  default from: 'factura-electronica@hidrotransp.com'


	  def bienvenido_email(invoice)
		  @invoices=invoice 			
		   @url  = 'http://www.apple.com'
		  #attachments["Factura"] = File.read("#{$lcFileName1}")
		  #attachments['Factura'] = File.read($lcFileName1)
		  email_with_name = "Factura Enviada <factura-electronica@hidrotransp.com>"	

		  attachments['Factura.pdf'] =  open($lcFileName1).read

		  mail(to: [$lcMail,$lcMail2,$lcMail3],  bcc:email_with_name, subject: 'Factura Electrónica : '+$lcFileNameIni )


	  end
end
