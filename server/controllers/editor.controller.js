import { ErrorHandler } from "../utils/error.js";
import { Editor } from "../models/editor.model.js";

// create
export const create = async (req, res, next) => {
  try {
    const { title } = req.body;
    const editor = new Editor({ title, userId: [req.id]});
    await editor.save();
    return res.status(200).json({docId : editor._id});
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// show
export const show = async (req, res, next) => {
  try {
    const { id } = req.params;
    const editor = await Editor.findOne({ _id: id });
    return res.status(200).json(editor);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// read
export const read = async (req, res, next) => {
  try {
    const editors = await Editor.find({ _id: req.id });
    return res.status(200).json(editors);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// update
export const update = async (req, res, next) => {
  try {
    const { content } = req.body;
    const { id } = req.params;

    // 1. Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler("Invalid ID format", 400));
    }

    // 3. Update the document in the database
    const updatedEditor = await Editor.findOneAndUpdate(
      { _id: id },
      { content },
      { new: true } // 'runValidators' ensures that model validation is applied
    );

    // If no document is found to update
    if (!updatedEditor) {
      return next(new ErrorHandler("Editor not found", 404));
    }

    // 4. Return the updated document
    return res.status(200).json({
      message: "Updated successfully",
    });
  } catch (error) {
    console.error(error); // Log the full error for better insight
    return next(new ErrorHandler(error.message, 500));
  }
};
