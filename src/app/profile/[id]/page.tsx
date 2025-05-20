export default function UserProfilePage({params}: any) {
    const {id} = params
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-white text-2xl">User Profile Page from {id}</h1>
    </div>
  );
}
