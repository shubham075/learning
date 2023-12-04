var verificationToken = `<html lang="en"> 
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" />  
    <link href='https://fonts.googleapis.com/css?family=Halvetica+Neue:300,400,500,600,700' rel="stylesheet">  
    <title>TEST pvt ltd</title>

    <style type="text/css">
        body {
            width: 100%;
            background-color: #ffffff;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased; 
        }  

        html {
            width: 100%;
        }

        table {
            font-size: 14px;
            border: 0;
        }
        .container-box {
            border: 2px solid #00000040;
            padding: 75px 100px;
            margin-top: 75px;
        } 
        .info-wrapper {
            color: #444B48; 
            font-size: 12px; 
            font-family: Halvetica Neue, sans-serif; 
            font-weight:500; 
            text-align: left;
        }
        .info {
            line-height: 15px
        }
        /* ----------- responsivity ----------- */ 
        @media only screen and (max-width: 640px) {  
            .container-box {
                width: 435px !important;
            }  
            .info {
                line-height: 18px
            } 
            .container-box { 
                padding: 45px;  
            }
        }

        @media only screen and (max-width: 479px) {  
            .container-box {
                width: auto !important;
            }   
            .container-box {
                border: 2px solid #00000040;
                padding: 30px;
                margin-top: 75px;
            } 
        }
    </style> 
</head> 
<body class="respond" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">  
    <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff"> 
        <tr>
            <td align="center">
                <table border="0" align="center" width="auto" cellpadding="0" cellspacing="0" class="container-box">
                    <tr> 
                        <td align="center" class="section-img">
                            <a href="" style=" border-style: none !important; display: block; border: 0 !important; float: left;"><img src="logo.png" style="display: block; width: 65px;left: -25px;position: relative;" width="65" border="0" alt="" /></a>
                        </td>
                    </tr>
                    <tr>
                        <td height="30" style="font-size: 20px; line-height: 20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td align="center" style="color: #444B48; font-size: 18px; font-family: Halvetica Neue, sans-serif; font-weight:600; text-align: left;"
                            class="main-header"> 
                            <div style="line-height: 22px">
                                To update your number, <br> confirm it's you
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td class="main-header info-wrapper"> 
                            <div class="info">
                                If you weren't expecting this email from company name. ignore<br>
                                this message to protect your privacy and security. If someone<br>
                                asks for this code. it's a scam.<br><br>
                                Enter this one-time code to finish signing in to your<br>
                                company account: 
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td align="center" style="color: #444B48; font-size: 24px; font-family: Halvetica Neue, sans-serif; font-weight:600; text-align: left;"
                            class="main-header"> 
                            <div style="line-height: 22px">
                                <span>{{{verification_otp}}}</span> 
                            </div>
                        </td>
                    </tr> 
                    <tr>
                        <td height="60" style="font-size: 10px; line-height: 10px;">&nbsp;</td>
                    </tr> 
                    <tr>
                        <td class="main-header info-wrapper"> 
                            <div class="info">
                                You received this email because you've used company name.<br>
                                Learn more at <a href="#" style="color: #5BCDA2; text-decoration: none;">company.me</a> or read our <a href="#" style="color: #5BCDA2; text-decoration: none;">Terms of Service</a><br>
                                or <a href="#" style="color: #5BCDA2; text-decoration: none;">Privacy Policy</a>.
                            </div>
                        </td>
                    </tr>
                </table>  
            </td>
        </tr> 
        <tr>
            <td height="40" style="font-size: 40px; line-height: 40px;">&nbsp;</td>
        </tr> 
    </table> 
</body> 
</html>`


module.exports = {
    verificationToken  : verificationToken
}