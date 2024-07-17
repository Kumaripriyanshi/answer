import listContentModel from "../Models/listContentModel.js";
import listModel from "../Models/listModel.js";
import userModel from "../models/userModel.js";
import { responseCodes } from "../ResCode.js";

export const addLists = async (req, res) => {
  try {
    const { name, filter, code, imgLink } = req.body;

    const newListContent = await listContentModel({
      filter,
      code,
      imgLink,
    }).save();
    // console.log(newListContent);
    const existingList = await userModel
      .findById(req.user._id)
      .select("-name")
      .select("-email")
      .select("-password")
      .populate("lists");
    const allList = existingList.lists;

    let listId = null;
    allList.length > 0 &&
      allList.forEach(async (element) => {
        if (element.name.toLowerCase() === name.toLowerCase()) {
          listId = element._id;
          //    break;
        }
      });
    let totalList;
    if (listId !== null) {
      await listModel.findByIdAndUpdate(listId, {
        $push: { listContent: newListContent._id },
      });
    } else {
      let list = new listModel({
        name: name,
        listContent: [],
      });
      list.listContent.push(newListContent._id);
      await list.save();

      await userModel.findByIdAndUpdate(req.user._id, {
        $push: { lists: list._id },
      });
    }

    res.status(200).send({
      success: true,
      message: "Successfully added new List",
      newListContent,
      totalList: existingList.lists.length,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error in Adding new List",
      err,
    });
  }
};

export const fetchAllImage = async (req, res) => {
  try {
    let list = [];
    const fetchData = async (element) => {
      const res = await fetch(`https://http.dog/${element}.json`);
      const data = await res.json();
      list.push(data);
    };

    await Promise.all(responseCodes.map(fetchData));

    res.status(200).send({
      success: true,
      message: "fetchhed Successfully ",
      list,
    });
  } catch (err) {
    res.status(400).send({
      success: true,
      message: "Error in fetching ",
      list,
    });
  }
};

export const getListByUserId = async (req, res) => {
  try {
    const existingList = await userModel
      .findById(req.user._id)
      .select("-name")
      .select("-email")
      .select("-password")
      .populate("lists");

    res.status(200).send({
      success: true,
      message: "Successfully fetched all List",
      existingList,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error in fetching List",
      err,
    });
  }
};

export const getListContent = async (req, res) => {
  try {
    const listId = req.params.listId;

    const data = await listModel.findById(listId).populate("listContent");

    res.status(200).send({
      success: true,
      message: "Successfully fetched all List",
      data,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error in fetching List",
      err,
    });
  }
};

export const deleteList = async (req, res) => {
  try {
    await listModel.findByIdAndDelete(req.params.listId);
    res.status(200).send({
      success: true,
      message: "List Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting List",
      error,
    });
  }
};

export const updateList = async (req, res) => {
  try {
    await listModel.findByIdAndUpdate(
      req.params.listId,
      { name: req.body.name },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "List Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting List",
      error,
    });
  }
};

export const deleteListContent = async (req, res) => {
  try {
    await listContentModel.findByIdAndDelete(req.params.listContentId);
    res.status(200).send({
      success: true,
      message: "List Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting List",
      error,
    });
  }
};
