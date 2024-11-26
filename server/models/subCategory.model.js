import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
      default: "",
        },
        category: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Category"
        }
    ]
  },
  {
    timestamps: true,
  }
);

const SubCategoryModel = mongoose.model("SubCategory", subcategorySchema);

export default SubCategoryModel;
