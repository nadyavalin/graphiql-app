import ProtectedRoute from "@shared/protected";
import { GraphQL } from "@widgets/GraphQL";

export default function GRAPHQL() {
  return (
    <ProtectedRoute>
      <GraphQL />
    </ProtectedRoute>
  );
}
