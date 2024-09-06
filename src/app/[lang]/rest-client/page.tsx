import ProtectedRoute from "@src/components/shared/protected";
import { RestClient } from "@widgets/RestClient";

export default function RestClientPage() {
  return (
    <ProtectedRoute>
      <RestClient />
    </ProtectedRoute>
  );
}
