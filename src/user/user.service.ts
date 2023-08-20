import { Injectable } from '@nestjs/common';
var fs = require('fs');
var pdf = require('dynamic-html-pdf');
import { ResumeBuilderDto } from './dto/resumeBuilder.dto';


@Injectable()
export class UserService {
    constructor() { }

    async buildResume(resumeDetails: ResumeBuilderDto) {
        try {
            let skills_array = resumeDetails.skills && resumeDetails.skills.length &&
            resumeDetails.skills.map((skill) => {
                return { skill }
            })
            
            let strengths_array = resumeDetails.strengths && resumeDetails.strengths.length &&
            resumeDetails.strengths.map((strength) => {
                return { strength }
            })
            
            let languages_array = resumeDetails.languages && resumeDetails.languages.length &&
            resumeDetails.languages.map((language) => {
                return { language }
            })
            
            const data = {
                user_name: resumeDetails.user_name,
                profile_picture_url: resumeDetails.profile_picture,
                job_title: resumeDetails.job_title,
                email_id: resumeDetails.email_id,
                mobile_no: resumeDetails.mobile_no,
                linkedin_link: resumeDetails.linkedin_link,
                address: resumeDetails.address,
                work_description: resumeDetails.work_description,
                education_details: resumeDetails.education_details,
                skills: skills_array,
                strengths: strengths_array,
                languages: languages_array,
                project_details: resumeDetails.project_details
            }
            
            let templates = ['template-1','template-2']

            for(let ind in templates){
                var html = fs.readFileSync(`src/user/Resume-Templates/${templates[ind]}.html`, 'utf8');
                var options = {
                    format: "A4",
                    orientation: "portrait"
                };
                var document = {
                    type: 'file',     // 'file' or 'buffer'
                    template: html,
                    context: data,
                    path: `src/user/Resumes/Resume-${resumeDetails.user_id}-${Number(ind)+1}.pdf`    // it is not required if type is buffer
                };
                await pdf.create(document, options)
                    .then(res => {
                        console.log(res)
                    })
                    .catch(error => {
                        console.error(error)
                    });
            }
            return {
                status: 200,
                message: "Successfully created resume."
            }


        } catch (err) {
            console.log("error in buildResume function >>>", err);

        }
    }

}
