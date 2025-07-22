// app/transformations/add/[type]/page.tsx
import { transformationTypes } from '@/constants';
import { auth } from '@clerk/nextjs/server';
import { getUserById } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import Header from '@/components/shared/Header';
import TransformationForm from '@/components/shared/TransformationForm';

type Props = {
  params: { type: keyof typeof transformationTypes }
};

export default async function AddTransformationTypePage({ params }: Props) {
  const type = params.type;
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const transformationType = transformationTypes[type];
  const user = await getUserById(userId);

  return (
    <>
      <Header
        title={transformationType.title}
        subtitle={transformationType.subTitle}
      />
      <section className="mt-9">
        <TransformationForm
          action="Add"
          userId={user._id}
          type={type}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  );
}
