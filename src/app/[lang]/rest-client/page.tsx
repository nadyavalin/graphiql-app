import ProtectedRoute from "@shared/protected";

const RestClient = () => {
  return (
    <ProtectedRoute>
      <h1>This is protected route</h1>
    </ProtectedRoute>
  );
};
export default RestClient;
