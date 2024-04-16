import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
import moment from "moment";
// ====== CREATE JOB ======
export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("Please Provide All Fields");
  }
  req.body.createdBy = req.user.userId;
  const job = await jobsModel.create(req.body);
  res.status(201).json({ job });
};

export const getAllJobsController = async (req, res, next) => {
  const { location, workType, company, position, sort,salary,jobLevel } = req.query;
  // condiions for searching filters
  const queryObject = {};

  //logic filters
  // if (location && location !== "all") {
  //   queryObject.workLocation = location;
  // }
  // if (jobLevel && jobLevel !== "all") {
  //   queryObject.jobLevel = jobLevel;
  // }
  // if (salary && salary !== "all") {
  //   queryObject.salary = salary;
  // }
  // if (company && company !== "all") {
  //   queryObject.company = company;
  // }
  // if (workType && workType !== "all") {
  //   queryObject.workType = workType;
  // }
  if (position) {
    queryObject.position = { $regex: position, $options: "i" };
  }

  let queryResult = jobsModel.find(queryObject);

  //sorting
  if (sort === "latest") {
    queryResult = queryResult.sort("-createdAt");
  }
  if (sort === "oldest") {
    queryResult = queryResult.sort("createdAt");
  }
  if (sort === "a-z") {
    queryResult = queryResult.sort("company");
  }
  if (sort === "z-a") {
    queryResult = queryResult.sort("-company");
  }

  try {
    //pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 35;
    const skip = (page - 1) * limit;

    const totalJobs = await jobsModel.countDocuments(queryObject);

    const jobs = await queryResult.skip(skip).limit(limit);

    const currentPageJob = jobs.length;
    const jobsOutOfTotaljobs = `${skip + 1}-${skip + currentPageJob}`;

    const numOfPages = Math.ceil(totalJobs / limit);
    const pagesOutOfTotalpages = `${page}-${numOfPages}`;
    console.log(totalJobs);
    res.status(200).json({
      page,
      numOfPages,
      currentPageJob,
      totalJobs,
      jobsOutOfTotaljobs,
      pagesOutOfTotalpages,
      jobs,
    });
  } catch (error) {
    console.error("Error retrieving jobs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ======= UPDATE JOBS ===========
export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;

  //    validation
  if (!company || !position) {
    next("Please provide All Fields");
  }
  //   find job
  const job = await jobsModel.findOne({ _id: id });

  // validation
  if (!job) {
    next(`no jobs found with this id ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("you are not Authorized to update this job");
    return;
  }
  const updateJob = await jobsModel.findOne({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  job.company = company;
  job.position = position;
  await job.save();
  res.status(200).json({ updateJob });
};

// =====DELETE JOB=====
export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  // validation
  if (!id) {
    next("please provide job id ");
  }
  const job = await jobsModel.findOne({ _id: id });
  if (!job) {
    next(`no job  is found with this id ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("you are not Authorized to update this job");
    return;
  }
  await job.deleteOne();
  res.status(200).json({ message: "job deleted successfully" });
};

//rate a job//////////

export const rateJobController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    // Check if the job with the provided ID exists
    const job = await jobsModel.findOne({ _id: id });

    if (!job) {
      return next(`No job found with this id: ${id}`);
    }

    if (rating === undefined || rating === null) {
      return next("Please provide a valid rating");
    }

    // Update the job with the new rating
    job.rating = rating;
    await job.save();

    return res.status(200).json({ message: "Job rated successfully", job });
  } catch (error) {
    // Handle any unexpected errors
    return next(error);
  }
};

// JOB STATS & FILTERS
export const jobStatsController = async (req, res, next) => {
  const stats = await jobsModel.aggregate([
    //  search by user jobs
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  const defaultStats = {
    pending: stats.pending || 0,
    reject: stats.reject || 0,
    interview: stats.interview || 0,
  };
  // monthly yearly stats
  let montlyApplications = await jobsModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  montlyApplications = montlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMMM Y");
      return { date, count };
    })
    .reverse();

  res
    .status(200)
    .json({ totalJob: stats.length, defaultStats, montlyApplications });
};

//sorting
