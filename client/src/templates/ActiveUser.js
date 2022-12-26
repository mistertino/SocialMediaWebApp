import React from 'react'
import { URL_CLIENT } from '../constants/constants'

const ActiveUser = ({ fullname, hashedEmail }) => {
  return (
    <div>
      {/*[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]*/}
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="x-apple-disable-message-reformatting" />
      {/*[if !mso]><!*/}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      {/*<![endif]*/}
      <title />
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html:
            "\n      @media only screen and (min-width: 620px) {\n  .u-row {\n    width: 600px !important;\n  }\n  .u-row .u-col {\n    vertical-align: top;\n  }\n\n  .u-row .u-col-100 {\n    width: 600px !important;\n  }\n\n}\n\n@media (max-width: 620px) {\n  .u-row-container {\n    max-width: 100% !important;\n    padding-left: 0px !important;\n    padding-right: 0px !important;\n  }\n  .u-row .u-col {\n    min-width: 320px !important;\n    max-width: 100% !important;\n    display: block !important;\n  }\n  .u-row {\n    width: 100% !important;\n  }\n  .u-col {\n    width: 100% !important;\n  }\n  .u-col > div {\n    margin: 0 auto;\n  }\n}\nbody {\n  margin: 0;\n  padding: 0;\n}\n\ntable,\ntr,\ntd {\n  vertical-align: top;\n  border-collapse: collapse;\n}\n\np {\n  margin: 0;\n}\n\n.ie-container table,\n.mso-container table {\n  table-layout: fixed;\n}\n\n* {\n  line-height: inherit;\n}\n\na[x-apple-data-detectors='true'] {\n  color: inherit !important;\n  text-decoration: none !important;\n}\n\ntable, td { color: #000000; } #u_body a { color: #161a39; text-decoration: underline; }\n    ",
        }}
      />
      {/*[if !mso]><!*/}
      <link
        href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap"
        rel="stylesheet"
        type="text/css"
      />
      {/*<![endif]*/}
      {/*[if IE]><div class="ie-container"><![endif]*/}
      {/*[if mso]><div class="mso-container"><![endif]*/}
      <table
        id="u_body"
        style={{
          borderCollapse: 'collapse',
          tableLayout: 'fixed',
          borderSpacing: 0,
          msoTableLspace: '0pt',
          msoTableRspace: '0pt',
          verticalAlign: 'top',
          minWidth: '320px',
          margin: '0 auto',
          backgroundColor: '#f9f9f9',
          width: '100%',
        }}
        cellPadding={0}
        cellSpacing={0}
      >
        <tbody>
          <tr style={{ verticalAlign: 'top' }}>
            <td
              style={{
                wordBreak: 'break-word',
                borderCollapse: 'collapse !important',
                verticalAlign: 'top',
              }}
            >
              {/*[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]*/}
              <div
                className="u-row-container"
                style={{ padding: '0px', backgroundColor: '#f9f9f9' }}
              >
                <div
                  className="u-row"
                  style={{
                    margin: '0 auto',
                    minWidth: '320px',
                    maxWidth: '600px',
                    overflowWrap: 'break-word',
                    wordWrap: 'break-word',
                    wordBreak: 'break-word',
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  <div
                    style={{
                      borderCollapse: 'collapse',
                      display: 'table',
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'transparent',
                    }}
                  >
                    {/*[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #f9f9f9;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #f9f9f9;"><![endif]*/}
                    {/*[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]*/}
                    <div
                      className="u-col u-col-100"
                      style={{
                        maxWidth: '320px',
                        minWidth: '600px',
                        display: 'table-cell',
                        verticalAlign: 'top',
                      }}
                    >
                      <div style={{ height: '100%', width: '100% !important' }}>
                        {/*[if (!mso)&(!IE)]><!*/}
                        <div
                          style={{
                            height: '100%',
                            padding: '0px',
                            borderTop: '0px solid transparent',
                            borderLeft: '0px solid transparent',
                            borderRight: '0px solid transparent',
                            borderBottom: '0px solid transparent',
                          }}
                        >
                          {/*<![endif]*/}
                          <table
                            style={{ fontFamily: '"Lato",sans-serif' }}
                            role="presentation"
                            cellPadding={0}
                            cellSpacing={0}
                            width="100%"
                            border={0}
                          >
                            <tbody>
                              <tr>
                                <td
                                  style={{
                                    overflowWrap: 'break-word',
                                    wordBreak: 'break-word',
                                    padding: '15px',
                                    fontFamily: '"Lato",sans-serif',
                                  }}
                                  align="left"
                                >
                                  <table
                                    height="0px"
                                    align="center"
                                    border={0}
                                    cellPadding={0}
                                    cellSpacing={0}
                                    width="100%"
                                    style={{
                                      borderCollapse: 'collapse',
                                      tableLayout: 'fixed',
                                      borderSpacing: 0,
                                      msoTableLspace: '0pt',
                                      msoTableRspace: '0pt',
                                      verticalAlign: 'top',
                                      borderTop: '1px solid #f9f9f9',
                                      msTextSizeAdjust: '100%',
                                      WebkitTextSizeAdjust: '100%',
                                    }}
                                  >
                                    <tbody>
                                      <tr style={{ verticalAlign: 'top' }}>
                                        <td
                                          style={{
                                            wordBreak: 'break-word',
                                            borderCollapse:
                                              'collapse !important',
                                            verticalAlign: 'top',
                                            fontSize: '0px',
                                            lineHeight: '0px',
                                            msoLineHeightRule: 'exactly',
                                            msTextSizeAdjust: '100%',
                                            WebkitTextSizeAdjust: '100%',
                                          }}
                                        >
                                          <span>&nbsp;</span>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          {/*[if (!mso)&(!IE)]><!*/}
                        </div>
                        {/*<![endif]*/}
                      </div>
                    </div>
                    {/*[if (mso)|(IE)]></td><![endif]*/}
                    {/*[if (mso)|(IE)]></tr></table></td></tr></table><![endif]*/}
                  </div>
                </div>
              </div>
              <div
                className="u-row-container"
                style={{ padding: '0px', backgroundColor: 'transparent' }}
              >
                <div
                  className="u-row"
                  style={{
                    margin: '0 auto',
                    minWidth: '320px',
                    maxWidth: '600px',
                    overflowWrap: 'break-word',
                    wordWrap: 'break-word',
                    wordBreak: 'break-word',
                    backgroundColor: '#161a39',
                  }}
                >
                  <div
                    style={{
                      borderCollapse: 'collapse',
                      display: 'table',
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'transparent',
                    }}
                  >
                    {/*[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #161a39;"><![endif]*/}
                    {/*[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]*/}
                    <div
                      className="u-col u-col-100"
                      style={{
                        maxWidth: '320px',
                        minWidth: '600px',
                        display: 'table-cell',
                        verticalAlign: 'top',
                      }}
                    >
                      <div style={{ height: '100%', width: '100% !important' }}>
                        {/*[if (!mso)&(!IE)]><!*/}
                        <div
                          style={{
                            height: '100%',
                            padding: '0px',
                            borderTop: '0px solid transparent',
                            borderLeft: '0px solid transparent',
                            borderRight: '0px solid transparent',
                            borderBottom: '0px solid transparent',
                          }}
                        >
                          {/*<![endif]*/}
                          <table
                            style={{ fontFamily: '"Lato",sans-serif' }}
                            role="presentation"
                            cellPadding={0}
                            cellSpacing={0}
                            width="100%"
                            border={0}
                          >
                            <tbody>
                              <tr>
                                <td
                                  style={{
                                    overflowWrap: 'break-word',
                                    wordBreak: 'break-word',
                                    padding: '30px 10px 30px',
                                    fontFamily: '"Lato",sans-serif',
                                  }}
                                  align="left"
                                >
                                  <div
                                    style={{
                                      lineHeight: '140%',
                                      textAlign: 'left',
                                      wordWrap: 'break-word',
                                    }}
                                  >
                                    <p
                                      style={{
                                        fontSize: '14px',
                                        lineHeight: '140%',
                                        textAlign: 'center',
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontSize: '28px',
                                          lineHeight: '39.2px',
                                          color: '#ffffff',
                                          fontFamily: 'Lato, sans-serif',
                                        }}
                                      >
                                        Xác nhận tài khoản
                                      </span>
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          {/*[if (!mso)&(!IE)]><!*/}
                        </div>
                        {/*<![endif]*/}
                      </div>
                    </div>
                    {/*[if (mso)|(IE)]></td><![endif]*/}
                    {/*[if (mso)|(IE)]></tr></table></td></tr></table><![endif]*/}
                  </div>
                </div>
              </div>
              <div
                className="u-row-container"
                style={{ padding: '0px', backgroundColor: 'transparent' }}
              >
                <div
                  className="u-row"
                  style={{
                    margin: '0 auto',
                    minWidth: '320px',
                    maxWidth: '600px',
                    overflowWrap: 'break-word',
                    wordWrap: 'break-word',
                    wordBreak: 'break-word',
                    backgroundColor: '#ffffff',
                  }}
                >
                  <div
                    style={{
                      borderCollapse: 'collapse',
                      display: 'table',
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'transparent',
                    }}
                  >
                    {/*[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]*/}
                    {/*[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]*/}
                    <div
                      className="u-col u-col-100"
                      style={{
                        maxWidth: '320px',
                        minWidth: '600px',
                        display: 'table-cell',
                        verticalAlign: 'top',
                      }}
                    >
                      <div style={{ height: '100%', width: '100% !important' }}>
                        {/*[if (!mso)&(!IE)]><!*/}
                        <div
                          style={{
                            height: '100%',
                            padding: '0px',
                            borderTop: '0px solid transparent',
                            borderLeft: '0px solid transparent',
                            borderRight: '0px solid transparent',
                            borderBottom: '0px solid transparent',
                          }}
                        >
                          {/*<![endif]*/}
                          <table
                            style={{ fontFamily: '"Lato",sans-serif' }}
                            role="presentation"
                            cellPadding={0}
                            cellSpacing={0}
                            width="100%"
                            border={0}
                          >
                            <tbody>
                              <tr>
                                <td
                                  style={{
                                    overflowWrap: 'break-word',
                                    wordBreak: 'break-word',
                                    padding: '40px 40px 30px',
                                    fontFamily: '"Lato",sans-serif',
                                  }}
                                  align="left"
                                >
                                  <div
                                    style={{
                                      lineHeight: '140%',
                                      textAlign: 'left',
                                      wordWrap: 'break-word',
                                    }}
                                  >
                                    <p
                                      style={{
                                        fontSize: '14px',
                                        lineHeight: '140%',
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontSize: '18px',
                                          lineHeight: '25.2px',
                                          color: '#666666',
                                        }}
                                      >
                                        Chào {fullname},
                                      </span>
                                    </p>
                                    <p
                                      style={{
                                        fontSize: '14px',
                                        lineHeight: '140%',
                                      }}
                                    >
                                      &nbsp;
                                    </p>
                                    <p
                                      style={{
                                        fontSize: '14px',
                                        lineHeight: '140%',
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontSize: '18px',
                                          lineHeight: '25.2px',
                                          color: '#666666',
                                        }}
                                      >
                                        Bạn đã đăng ký thành công tài khoản tại
                                        TCMedia Social. Vui lòng kích hoạt tài
                                        khoản tại link bên dưới!
                                      </span>
                                    </p>
                                    <p
                                      style={{
                                        fontSize: '14px',
                                        lineHeight: '140%',
                                      }}
                                    >
                                      &nbsp;
                                    </p>
                                    <p
                                      style={{
                                        fontSize: '14px',
                                        lineHeight: '140%',
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontSize: '18px',
                                          lineHeight: '25.2px',
                                          color: '#666666',
                                        }}
                                      >
                                        Chúc bạn có những trải nghiệm thú vị!
                                      </span>
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table
                            style={{ fontFamily: '"Lato",sans-serif' }}
                            role="presentation"
                            cellPadding={0}
                            cellSpacing={0}
                            width="100%"
                            border={0}
                          >
                            <tbody>
                              <tr>
                                <td
                                  style={{
                                    overflowWrap: 'break-word',
                                    wordBreak: 'break-word',
                                    padding: '0px 40px',
                                    fontFamily: '"Lato",sans-serif',
                                  }}
                                  align="left"
                                >
                                  {/*[if mso]><style>.v-button {background: transparent !important;}</style><![endif]*/}
                                  <div align="left">
                                    {/*[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:52px; v-text-anchor:middle; width:156px;" arcsize="2%"  stroke="f" fillcolor="#18163a"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Lato',sans-serif;"><![endif]*/}
                                    <a
                                      href={
                                        URL_CLIENT + '/active/' + hashedEmail
                                      }
                                      target="_blank"
                                      className="v-button"
                                      style={{
                                        boxSizing: 'border-box',
                                        display: 'inline-block',
                                        fontFamily: '"Lato",sans-serif',
                                        textDecoration: 'none',
                                        WebkitTextSizeAdjust: 'none',
                                        textAlign: 'center',
                                        color: '#FFFFFF',
                                        backgroundColor: '#18163a',
                                        borderRadius: '1px',
                                        WebkitBorderRadius: '1px',
                                        MozBorderRadius: '1px',
                                        width: 'auto',
                                        maxWidth: '100%',
                                        overflowWrap: 'break-word',
                                        wordBreak: 'break-word',
                                        wordWrap: 'break-word',
                                        msoBorderAlt: 'none',
                                      }}
                                    >
                                      <span
                                        style={{
                                          display: 'block',
                                          padding: '15px 40px',
                                          lineHeight: '120%',
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontSize: '18px',
                                            lineHeight: '21.6px',
                                          }}
                                        >
                                          Kích hoạt
                                        </span>
                                      </span>
                                    </a>
                                    {/*[if mso]></center></v:roundrect><![endif]*/}
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table
                            style={{ fontFamily: '"Lato",sans-serif' }}
                            role="presentation"
                            cellPadding={0}
                            cellSpacing={0}
                            width="100%"
                            border={0}
                          >
                            <tbody>
                              <tr>
                                <td
                                  style={{
                                    overflowWrap: 'break-word',
                                    wordBreak: 'break-word',
                                    padding: '40px 40px 30px',
                                    fontFamily: '"Lato",sans-serif',
                                  }}
                                  align="left"
                                >
                                  <div
                                    style={{
                                      lineHeight: '140%',
                                      textAlign: 'left',
                                      wordWrap: 'break-word',
                                    }}
                                  >
                                    <p
                                      style={{
                                        fontSize: '14px',
                                        lineHeight: '140%',
                                      }}
                                    >
                                      <span
                                        style={{
                                          color: '#888888',
                                          fontSize: '14px',
                                          lineHeight: '19.6px',
                                        }}
                                      >
                                        <em>
                                          <span
                                            style={{
                                              fontSize: '16px',
                                              lineHeight: '22.4px',
                                            }}
                                          >
                                            Vui lòng bỏ qua email này nếu bạn
                                            không đăng ký tại website của chúng
                                            tôi.
                                          </span>
                                        </em>
                                      </span>
                                      <br />
                                      <span
                                        style={{
                                          color: '#888888',
                                          fontSize: '14px',
                                          lineHeight: '19.6px',
                                        }}
                                      >
                                        <em>
                                          <span
                                            style={{
                                              fontSize: '16px',
                                              lineHeight: '22.4px',
                                            }}
                                          >
                                            &nbsp;
                                          </span>
                                        </em>
                                      </span>
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          {/*[if (!mso)&(!IE)]><!*/}
                        </div>
                        {/*<![endif]*/}
                      </div>
                    </div>
                    {/*[if (mso)|(IE)]></td><![endif]*/}
                    {/*[if (mso)|(IE)]></tr></table></td></tr></table><![endif]*/}
                  </div>
                </div>
              </div>
              {/*[if (mso)|(IE)]></td></tr></table><![endif]*/}
            </td>
          </tr>
        </tbody>
      </table>
      {/*[if mso]></div><![endif]*/}
      {/*[if IE]></div><![endif]*/}
    </div>
  )
}

export default ActiveUser
