import ProtectedRoute from "@shared/protected";
import HistoryRequests from "@widgets/HistoryRequests";

export default function HistoryPage() {
  return (
    <ProtectedRoute>
      <HistoryRequests />
    </ProtectedRoute>
  );
}
