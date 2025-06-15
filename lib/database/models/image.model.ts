import { Document, model, models, Schema } from "mongoose";

/**
 * واجهة TypeScript لتمثيل وثيقة الصورة في الكود
 * --------------------------------------------
 * - تمدد (extends) Document من Mongoose لإضافة أساليب مثل .save() و .remove()
 * - تحدد شكـل البيانات وخصائصها أثناء التطوير (compile‑time only)
 */
export interface IImage extends Document {
  title: string;               // عنوان الصورة (إلزامي)
  transformationType: string;  // نوع التحويل أو التعديل (إلزامي)
  publicId: string;            // المعرف العام (مثلاً من خدمة Cloudinary) (إلزامي)
  secureUrl: string;           // رابط آمن للوصول إلى الصورة (إلزامي)
  width?: number;              // عرض الصورة بالبكسل (اختياري)
  height?: number;             // ارتفاع الصورة بالبكسل (اختياري)
  config?: object;             // إعدادات إضافية للتحويل (اختياري)
  transformationUrl?: string;  // رابط الصورة بعد تطبيق التحويل (اختياري)
  aspectRatio?: string;        // نسبة العرض إلى الارتفاع (اختياري)
  color?: string;              // اللون المسيطر في الصورة (اختياري)
  prompt?: string;             // الوصف أو الأمر المستخدم لإنشاء الصورة (اختياري)
  author: {                    // بيانات المؤلف (المستخدم) الذي رفع الصورة
    _id: string;               // معرف المستخدم
    firstname: string;         // الاسم الأول
    lastname: string;          // الاسم الأخير
  }
  createdAt?: Date;            // تاريخ الإنشاء (يملأ تلقائياً بواسطة schema) (اختياري)
  updatedAt?: Date;            // تاريخ آخر تعديل (يملأ تلقائياً بواسطة schema) (اختياري)
}

/**
 * مخطط Mongoose لبناء نموذج الصورة في وقت التشغيل
 * -----------------------------------------------
 * - يحدد أنواع الحقول، وجوبية بعضها، والقيم الافتراضية
 * - يستخدم للتحقق من البيانات قبل التخزين في MongoDB
 * - يُمكن إضافة hooks، virtuals، وطرق مخصصة هنا
 */
const ImageSchema = new Schema({
  title:             { type: String, required: true },      // عنوان الصورة (إلزامي)
  transformationType:{ type: String, required: true },      // نوع التحويل (إلزامي)
  publicId:          { type: String, required: true },      // المعرف العام (إلزامي)
  secureUrl:         { type: URL,    required: true },      // رابط آمن (إلزامي)
  width:             { type: Number },                      // عرض الصورة
  height:            { type: Number },                      // ارتفاع الصورة
  config:            { type: Object },                      // إعدادات التحويل الإضافية
  transformationUrl: { type: URL },                         // رابط الصورة بعد التحويل
  aspectRatio:       { type: String },                      // نسبة العرض/الارتفاع
  color:             { type: String },                      // اللون المسيطر
  prompt:            { type: String },                      // الوصف/الأمر المستخدم
  author:            { type: Schema.Types.ObjectId, ref: 'User' }, // مرجع إلى مستخدم في جدول Users
  createdAt:         { type: Date, default: Date.now },     // تاريخ الإنشاء الافتراضي
  updatedAt:         { type: Date, default: Date.now }      // تاريخ التحديث الافتراضي
});

/**
 * إنشاء أو إعادة استخدام الموديل لكي لا يحصل خطأ بتعريف الموديل مرتين
 */
const Image = models.Image || model("Image", ImageSchema);

export default Image;
