import path from 'path'
import Report from '../models/reports.model.js'
import { generateDocxReport } from '../services/report/reports.services.js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import GeneralInfo from '../models/general_info.model.js'

// Get the current file and directory names using Node.js modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * Controller function to fetching reports
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
export const getReports = async (req, res) => {
  try {
    const reports = await Report.findAll()
    res.send(reports)
  } catch (error) {
    console.error('Error sending repors', error)
    res.status(500).json({ error: 'Error sending reports' })
  }
}

/**
 * Controller function to handle fetching and sending a report as a downloadable file.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
export const getReport = async (req, res) => {
  try {
    const reportId = req.params.id
    generateDocxReport(reportId)

    // Construct the full file path using the current directory
    const filePath = path.join(__dirname, '../../', 'example.docx')

    // Set response headers for file download and send the generated file as the response
    res.setHeader('Content-Disposition', `attachment; filename=${__filename}`)
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )
    res.sendFile(filePath)
  } catch (error) {
    console.error('Error generating or sending report', error)
    res.status(500).json({ error: 'Error generating or sending report' })
  }
}

/**
 * Controller function to handle creating a new report in the database.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
export const createReport = async (req, res) => {
  try {
    const report = await Report.create(req.body)
    await GeneralInfo.create({
      //...restData
      report_id: report.id
    })
    res.json(report)
  } catch (error) {
    console.error('Error creating report in the database', error)
    res.status(500).json({ error: 'Error creating report in the database' })
  }
}
