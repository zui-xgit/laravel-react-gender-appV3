<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello World PDF</title>
    <style>
        /* Essential CSS 2.1 overrides for Dompdf compatibility */
        @page {
            margin: 80px 50px;
        }
        
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #1e293b;
            line-height: 1.6;
            font-size: 14px;
            margin: 0;
            padding: 0;
            background-color: #ffffff;
        }

        /* Top header layout using standard tables instead of flexbox */
        .header {
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 12px;
            margin-bottom: 30px;
        }

        .header-table {
            width: 100%;
            border-collapse: collapse;
        }

        .header-left {
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #4f46e5;
        }

        .header-right {
            font-size: 11px;
            color: #94a3b8;
            text-align: right;
        }

        /* Body Area */
        .content-body {
            padding: 20px 0;
        }

        .main-heading {
            font-size: 26px;
            font-weight: bold;
            color: #0f172a;
            margin-bottom: 15px;
        }

        .description-text {
            color: #475569;
            font-size: 16px;
        }

        /* Footer pinned to the absolute page bottom bounds */
        .footer {
            position: fixed;
            bottom: -50px;
            left: 0;
            right: 0;
            height: 30px;
            border-top: 1px solid #f1f5f9;
            text-align: center;
            padding-top: 10px;
        }

        .footer-text {
            font-size: 10px;
            color: #94a3b8;
        }
    </style>
</head>
<body>

    <div class="header">
        <table class="header-table">
            <tr>
                <td class="header-left">System Output Log</td>
                <td class="header-right">Status: Ready</td>
            </tr>
        </table>
    </div>

    <div class="content-body">
        <h1 class="main-heading">Hello World</h1>
        <p class="description-text">
            This document is compiled using the Spatie Laravel-PDF layout engine powered by a pure PHP Dompdf configuration driver. No variables, no database overhead—just clean execution.
        </p>
    </div>

    <div class="footer">
        <span class="footer-text">
            Automated PDF Preview. Securely processed by the platform printing pipeline.
        </span>
    </div>

</body>
</html>