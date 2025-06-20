import mongoose,  { Mongoose } from 'mongoose';
const MONGODB_URL = process.env.MONGODB_URL;
// هذا الملف مسؤول عن الاتصال بقاعدة بيانات MongoDB باستخدام Mongoose
// يجب أن يكون لديك متغير بيئة MONGODB_URL في ملف .env.local
// نحن نحتاج إلى فتح الاتصال مرة واحدة فقط، وإعادة استخدامه في كل مرة بعد ذلك.
interface MongooseConnection {
    conn : Mongoose | null;
    promise: Promise<Mongoose> | null;
}
// نقوم بتخزين الاتصال في الذاكرة لتجنب إنشاء اتصالات متعددة
let cached: MongooseConnection = (global as any).mongoose;
// إذا لم يكن هناك اتصال مخزن في الذاكرة، نقوم بإنشاء واحد جديد
if(!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null }
}

// نقوم بتصدير دالة للاتصال بقاعدة البيانات
export const connectToDatabase = async () => {
    if (cached.conn) {
        return cached.conn;
}
// إذا كان هناك اتصال قيد الانتظار، نعيد استخدامه

if (!MONGODB_URL) {
    throw new Error('Please define the MONGODB_URL environment variable inside .env.local');
}

// إذا لم يكن هناك اتصال قيد الانتظار، نقوم بإنشاء اتصال جديد
 
cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {dbName: 'imagine_saas',bufferCommands:false})
    cached.conn = await cached.promise;
    return cached.conn;
}

