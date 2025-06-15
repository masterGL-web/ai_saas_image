import { Schema, model, models } from "mongoose";

const TransactionSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  plan: {
    type: String,
  },
  credits: {
    type: Number,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
const Transaction = models?.Transaction || model("Transaction", TransactionSchema);
//إذا كان نموذج Transaction موجودًا مسبقًا (في الذاكرة)، نستخدمه.
// إذا لم يكن موجودًا، نقوم بإنشاء نموذج جديد باستخدام TransactionSchema.
// هذا يمنع حدوث خطأ عند إعادة تشغيل التطبيق أو عند استخدام Hot Reload في بيئات التطوير مثل Next.js.
export default Transaction;