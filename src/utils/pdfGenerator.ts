import fs from 'fs';
import PDFDocument from 'pdfkit';
import { IResult } from '../interface/index.interface';
import { error, log } from 'console';
import { feesModel } from 'src/model/fees.model';
import { resultModel } from 'src/model/result.model';


export const generatePDF = (data:any) =>{
        const doc = new PDFDocument();

        const marginLeft = 50;
        const marginRight = 50;
        const headerFontSize = 14;
        const rowFontSize = 12;
        const initialYPosition = 50;
        const columnGap = 200;

        doc.fontSize(headerFontSize).text('Cab Details', marginLeft, initialYPosition);

        let yPosition = initialYPosition + 40;

 
        data.forEach((elem:any, index:any) =>{

            let resultDetail:IResult = elem;
            console.log(resultDetail);
            
            if(resultDetail){

                doc.moveTo(marginLeft, yPosition).lineTo(marginLeft + 4 * columnGap, yPosition).stroke();
                
                 // Write cab details
                 doc.fontSize(rowFontSize).text(`student Id: ${resultDetail.student  || 'N/A'}`, marginLeft, yPosition + 20);
                 doc.text(`total marks: ${resultDetail.totalMarks  || 'N/A'}`, marginLeft, yPosition + 40);
                 doc.text(`obtain mark: ${resultDetail.obtainMarks || 'N/A'}`, marginLeft, yPosition + 60);
                 doc.text(`grade: ${resultDetail.grade || 'N/A'}`, marginLeft, yPosition + 80);
                 doc.text(`status: ${resultDetail.status || 'N/A'}`, marginLeft, yPosition + 100);
                 doc.text(`percentage: ${resultDetail.percentage  || 'N/A'}`, marginLeft, yPosition + 120);
                 doc.text(`rank: ${resultDetail.rank  || 'N/A'}`, marginLeft, yPosition + 140);
               
                 yPosition += 160;
            }
            else{
                doc.fontSize(rowFontSize).text(`Details unavailable`, marginLeft, yPosition);
                yPosition += 40;
            }
        })
        
       doc.moveTo(marginLeft, yPosition).lineTo(marginLeft + 4 * columnGap, yPosition).stroke();

        return doc;
}

