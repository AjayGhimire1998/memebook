import MemeContainer from "./MemeContainer";

export default function HomePageView({
  allUploadedMemes,
  getAllUploadedMemes,
  deleteMeme,
  handleDelete,
}) {
  return (
    <div className="container">
      <MemeContainer
        allUploadedMemes={allUploadedMemes}
        deleteMeme={deleteMeme}
        handleDelete={handleDelete}
      />
    </div>
  );
}
