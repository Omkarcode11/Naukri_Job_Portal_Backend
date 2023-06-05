const Company = require("../model/Company")
const Job = require("../model/Job")


exports.createJob = async (req, res) => {
    try {
        let job = await Job.create(req.body)
        if (job) {
            return res.status(200).send('Job Created Successfully')
        } else {
            return res.status(200).send("Job create Unsuccessfully")
        }
    } catch (err) {
        return res.status(500).send('internal Error job is not created')
    }

}

exports.deleteJob = async (req, res) => {
    try {

        let job = await Job.findByIdAndDelete(req.params.id)

        if (job) {
            return res.status(200).send('job deleted successfully')
        } else {
            return res.status(200).send('job not delete')
        }
    } catch (err) {

        return res.status(500).send('internal Error job is not deleted')
    }

}

exports.findJobApplicants = async (req, res) => {
    try {
        let applicants = await Job.findById(req.params.id, 'applicants').populate('applicants')

        if (applicants) {
            return res.status(200).send(applicants)
        } else {
            return res.status(200).send('no applicants there')
        }

    } catch (error) {
        return res.status(500).send(error)

    }
}


