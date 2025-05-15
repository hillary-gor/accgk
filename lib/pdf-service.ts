import PDFDocument from "pdfkit"
import { Readable } from "stream"

export async function generateLicensePDF(
  name: string,
  licenseNumber: string,
  issueDate: string,
  expiryDate: string,
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      // Create a document
      const doc = new PDFDocument({
        size: "A4",
        layout: "landscape",
        margin: 50,
        info: {
          Title: "Caregiver License Certificate",
          Author: "Association of Certified Caregivers Kenya",
        },
      })

      // Collect the PDF data chunks
      const chunks: Buffer[] = []
      const stream = new Readable()

      doc.on("data", (chunk) => chunks.push(chunk))
      doc.on("end", () => resolve(Buffer.concat(chunks)))
      doc.on("error", reject)

      // Add content to the PDF
      // Header
      doc.fontSize(25).font("Helvetica-Bold").text("ASSOCIATION OF CERTIFIED CAREGIVERS KENYA", { align: "center" })

      doc.moveDown()
      doc.fontSize(20).text("OFFICIAL LICENSE CERTIFICATE", { align: "center" })

      // Add a border
      doc
        .rect(20, 20, doc.page.width - 40, doc.page.height - 40)
        .lineWidth(3)
        .stroke()

      // Add decorative elements
      doc
        .save()
        .moveTo(50, 100)
        .lineTo(doc.page.width - 50, 100)
        .stroke()
        .restore()

      // Certificate content
      doc.moveDown(2)
      doc.fontSize(16).font("Helvetica").text("This is to certify that", { align: "center" })

      doc.moveDown()
      doc.fontSize(24).font("Helvetica-Bold").text(name, { align: "center" })

      doc.moveDown()
      doc
        .fontSize(16)
        .font("Helvetica")
        .text("has met all requirements and is hereby licensed as a", { align: "center" })

      doc.moveDown()
      doc.fontSize(20).font("Helvetica-Bold").text("CERTIFIED CAREGIVER", { align: "center" })

      doc.moveDown(2)
      doc.fontSize(14).font("Helvetica").text(`License Number: ${licenseNumber}`, { align: "center" })

      doc.moveDown()
      doc.text(`Issue Date: ${issueDate}`, { align: "center" })

      doc.moveDown()
      doc.text(`Expiry Date: ${expiryDate}`, { align: "center" })

      // Signature
      doc.moveDown(2)
      doc.fontSize(14).text("_______________________", { align: "center" })
      doc.moveDown()
      doc.text("Authorized Signature", { align: "center" })

      // Footer
      doc.fontSize(10).text("This license is issued by the Association of Certified Caregivers Kenya.", {
        align: "center",
        y: doc.page.height - 100,
      })

      doc.moveDown()
      doc.text("Verify this certificate at www.accgk.org/verify", { align: "center" })

      // Finalize the PDF
      doc.end()
    } catch (error) {
      reject(error)
    }
  })
}

export async function generateCertificationPDF(
  name: string,
  certificationType: string,
  issueDate: string,
  expiryDate: string,
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      // Create a document
      const doc = new PDFDocument({
        size: "A4",
        layout: "landscape",
        margin: 50,
        info: {
          Title: `${certificationType} Certification`,
          Author: "Association of Certified Caregivers Kenya",
        },
      })

      // Collect the PDF data chunks
      const chunks: Buffer[] = []
      const stream = new Readable()

      doc.on("data", (chunk) => chunks.push(chunk))
      doc.on("end", () => resolve(Buffer.concat(chunks)))
      doc.on("error", reject)

      // Add content to the PDF
      // Header
      doc.fontSize(25).font("Helvetica-Bold").text("ASSOCIATION OF CERTIFIED CAREGIVERS KENYA", { align: "center" })

      doc.moveDown()
      doc.fontSize(20).text(`${certificationType.toUpperCase()} CERTIFICATION`, { align: "center" })

      // Add a border
      doc
        .rect(20, 20, doc.page.width - 40, doc.page.height - 40)
        .lineWidth(3)
        .stroke()

      // Add decorative elements
      doc
        .save()
        .moveTo(50, 100)
        .lineTo(doc.page.width - 50, 100)
        .stroke()
        .restore()

      // Certificate content
      doc.moveDown(2)
      doc.fontSize(16).font("Helvetica").text("This is to certify that", { align: "center" })

      doc.moveDown()
      doc.fontSize(24).font("Helvetica-Bold").text(name, { align: "center" })

      doc.moveDown()
      doc.fontSize(16).font("Helvetica").text("has successfully completed the requirements for", { align: "center" })

      doc.moveDown()
      doc.fontSize(20).font("Helvetica-Bold").text(certificationType.toUpperCase(), { align: "center" })

      doc.moveDown(2)
      doc.fontSize(14).font("Helvetica").text(`Issue Date: ${issueDate}`, { align: "center" })

      doc.moveDown()
      doc.text(`Valid Until: ${expiryDate}`, { align: "center" })

      // Signature
      doc.moveDown(2)
      doc.fontSize(14).text("_______________________", { align: "center" })
      doc.moveDown()
      doc.text("Authorized Signature", { align: "center" })

      // Footer
      doc.fontSize(10).text("This certification is issued by the Association of Certified Caregivers Kenya.", {
        align: "center",
        y: doc.page.height - 100,
      })

      doc.moveDown()
      doc.text("Verify this certificate at www.accgk.org/verify", { align: "center" })

      // Finalize the PDF
      doc.end()
    } catch (error) {
      reject(error)
    }
  })
}

export async function generateTrainingCompletionPDF(
  name: string,
  trainingProgram: string,
  completionDate: string,
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      // Create a document
      const doc = new PDFDocument({
        size: "A4",
        layout: "landscape",
        margin: 50,
        info: {
          Title: "Training Completion Certificate",
          Author: "Association of Certified Caregivers Kenya",
        },
      })

      // Collect the PDF data chunks
      const chunks: Buffer[] = []
      const stream = new Readable()

      doc.on("data", (chunk) => chunks.push(chunk))
      doc.on("end", () => resolve(Buffer.concat(chunks)))
      doc.on("error", reject)

      // Add content to the PDF
      // Header
      doc.fontSize(25).font("Helvetica-Bold").text("ASSOCIATION OF CERTIFIED CAREGIVERS KENYA", { align: "center" })

      doc.moveDown()
      doc.fontSize(20).text("CERTIFICATE OF COMPLETION", { align: "center" })

      // Add a border
      doc
        .rect(20, 20, doc.page.width - 40, doc.page.height - 40)
        .lineWidth(3)
        .stroke()

      // Add decorative elements
      doc
        .save()
        .moveTo(50, 100)
        .lineTo(doc.page.width - 50, 100)
        .stroke()
        .restore()

      // Certificate content
      doc.moveDown(2)
      doc.fontSize(16).font("Helvetica").text("This is to certify that", { align: "center" })

      doc.moveDown()
      doc.fontSize(24).font("Helvetica-Bold").text(name, { align: "center" })

      doc.moveDown()
      doc.fontSize(16).font("Helvetica").text("has successfully completed the training program", { align: "center" })

      doc.moveDown()
      doc.fontSize(20).font("Helvetica-Bold").text(trainingProgram, { align: "center" })

      doc.moveDown(2)
      doc.fontSize(14).font("Helvetica").text(`Completion Date: ${completionDate}`, { align: "center" })

      // Signature
      doc.moveDown(2)
      doc.fontSize(14).text("_______________________", { align: "center" })
      doc.moveDown()
      doc.text("Trainer Signature", { align: "center" })

      // Footer
      doc.fontSize(10).text("This certificate is issued by the Association of Certified Caregivers Kenya.", {
        align: "center",
        y: doc.page.height - 100,
      })

      doc.moveDown()
      doc.text("Verify this certificate at www.accgk.org/verify", { align: "center" })

      // Finalize the PDF
      doc.end()
    } catch (error) {
      reject(error)
    }
  })
}
