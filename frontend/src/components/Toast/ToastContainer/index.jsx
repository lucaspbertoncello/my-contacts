import ToastMessage from "../ToastMessage";

export default function ToastContainer() {
  return (
    <div className="fixed bottom-14 left-1/2 translate-x-[-50%] z-50">
      <ToastMessage text={"default notification"} />
      <ToastMessage text={"sucess notification"} type="sucess" />
      <ToastMessage text={"danger notification"} type="danger" />
    </div>
  );
}
