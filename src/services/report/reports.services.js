/* eslint-disable no-unused-vars */
import HTMLtoDOCX from 'html-to-docx'
import Report from '../../models/reports.model.js'
import fs from 'fs'

const objeto = {
  'Fecha de solicitud': '11/12/2023',
  'Fecha de inspección': '15/12/2023',
  'Fecha entrega del informe': '19/12/2023',
  'Compañía aseguradora': 'Solidaria de Colombia',
  'Sucursal y/o agencia': 'Agencia Tunja',
  'Funcionario que autorizó': 'Sandra Milena Díaz Marciales',
  'Asesor de seguros': 'No Informan',
  'Nombre del riesgo': 'Restaurante Las Rokas',
  'NIT / CC': '901.520.429-5',
  Actividad: 'Restaurante',
  'Contacto en el predio': 'Nelyda Martínez',
  'Cargo del contacto': 'Administradora',
  'Teléfonos de contacto': '3104931756',
  'E-mail del contacto': 'lasrokasclub@gmail.com',
  'Dirección actual del predio': 'Kilómetro 1 vía Paipa pantano de Vargas',
  Barrio: 'Salida al pantano de Vargas',
  Municipio: 'Paipa',
  Departamento: 'Boyacá'
}

const tablaHTML = (data) => `<table border="1">
  <tbody>
    ${Object.entries(data)
      .map(
        ([clave, valor]) =>
          `<tr>
            <td class="column">${clave}</td>
            <td>${valor}</td>
          </tr>`
      )
      .join('')}
  </tbody>
</table>`

/**
 * Generate HTML content for the DOCX report based on report data.
 * @param {object} _reportData - Data used to populate the HTML content.
 * @returns {string} - HTML content for the DOCX report.
 */
const htmlContent = (_reportData) => `
<html>
<head>
    <title>HTML to DOCX Document</title>
</head>
<body>
    <div>
        <div>
            <p align="center">
                <span>INFORME DE EVALUACIÓN DE RIESGOS</span>
            </p>
        </div>
        <div>IMAGEN PROPIEDAD IMAGEN PROPIEDAD IMAGEN PROPIEDAD</div>
        <div>
            <p align="right">
                <span>RESTAURANTE LAS ROKAS</span>
            </p>
        </div>
        <div>
            <p><b><span>INFORMACIÓN GENERAL</span></b></p>
            <div align="center">${tablaHTML(objeto)}</div>
        </div>
        <div>
            <p><span>ENFOQUE Y ALCANCE</span></p>
            <div>
                <p align="justify">Este informe está encaminado básicamente para efectos de suscripción de contrato de
                    seguros y se fundamenta en las condiciones observadas e información suministrada por quien atendió
                    la inspección. El análisis aquí presentado no implica que no existan otras condiciones de riesgo;
                    este documento tiene fines informativos.
                </p>
                <p>El presente formato de inspección no es una oferta, ni constituye compromiso de asunción de riesgos
                    por parte de la Compañía de Seguros y por lo tanto no genera ninguna clase de contrato, obligación
                    o de responsabilidad a cargo de LA ASEGURADORA, la inspección realizada al riesgo servirá de base
                    para la aceptación o rechazo de la solicitud por parte de la Compañía de Seguros.
                </p>
                <p>El informe se presenta en capítulos donde se muestra de manera general la empresa, sus procesos y las
                    medidas de control con las que cuenta. Luego se hace una descripción de lo que es la identificación
                    y
                    evaluación de riesgos presentando el resultado de los riesgos encontrados durante la inspección
                    física
                    y calificados para su priorización. Por último, se presenta el tratamiento de los riesgos, donde se
                    presentan las recomendaciones para disminuir el nivel de los riesgos.
                </p>
                <p>La metodología de este trabajo está basada en la Norma Técnica Colombiana NTC-ISO 31000 Gestión del
                    Riesgo.</p>
            </div>
        </div>
        <div>
            <p><span>CONTENIDO</span></p>
        </div>
        <div>
            <p><span>1 INCENDIO</span></p>
            <p><span>1.1 UBICACIÓN</span></p>
            <div align="center">${tablaHTML(objeto)}</div>
        </div>
    </div>
  </body>
  </html>
  `

/**
 * Generate a DOCX report using HTML content and save it to a file.
 * @param {number} id - Identifier used to fetch report data from the database.
 * @returns {Buffer} - Buffer containing the generated DOCX file content.
 */
export const generateDocxReport = async (id) => {
  try {
    // Get report data from the database based on the provided ID
    const report = await Report.findByPk(id)

    // Define the file path where the DOCX report will be saved
    const filePath = '/Users/bry/Documents/core-backend/example.docx'

    // Generate a DOCX file buffer using HTML content and additional options
    const fileBuffer = await HTMLtoDOCX(
      htmlContent(report.dataValues),
      '<p> Hello header </p>',
      {
        table: { row: { cantSplit: true } },
        footer: true,
        pageNumber: true,
        styles: `
          .column {
            background: red;
          }
        `
      }
    )

    // Write the file buffer to the specified file path
    fs.writeFile(filePath, fileBuffer, (error) => {
      if (error) {
        console.log('Docx file creation failed')
        return
      }
      console.log('Docx file created successfully')
    })
  } catch (error) {
    console.error('Error generating or saving DOCX report', error)
  }
}
