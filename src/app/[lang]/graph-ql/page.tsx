import ProtectedRoute from "@shared/protected";
import { GraphQL } from "@widgets/GraphQL";

export default function GraphQLPage() {
  return (
    <ProtectedRoute>
      <GraphQL />
    </ProtectedRoute>
  );
}
