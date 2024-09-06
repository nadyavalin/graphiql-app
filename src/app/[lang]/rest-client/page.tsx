import ProtectedRoute from "@shared/protected";
import { RestClient } from "@widgets/RestClient";

export default function RestClientPage() {
  return (
    <ProtectedRoute>
      <RestClient />
    </ProtectedRoute>
  );
}
