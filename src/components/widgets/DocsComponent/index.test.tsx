import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DocsComponent } from ".";
import useAppSelector from "@shared/hooks/useAppSelector";
import { useDictionary } from "@shared/providers/DictionaryProvider";

vi.mock("@shared/hooks/useAppSelector");
vi.mock("@shared/providers/DictionaryProvider");
vi.mock("@graphiql/react", () => ({
  DocExplorer: () => <div>DocExplorer</div>,
  GraphiQLProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
vi.mock("next/image", () => ({
  __esModule: true,
  default: function MockImage({ alt }: { alt: string }) {
    return <img alt={alt} />;
  },
}));

describe("DocsComponent", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders nothing when isSdlExists is false", () => {
    (useAppSelector as vi.Mock).mockReturnValue(false);

    render(<DocsComponent />);

    expect(screen.queryByAltText("Docs Icon")).toBeNull();
  });

  it("renders docs icon when isSdlExists is true", () => {
    (useAppSelector as vi.Mock).mockReturnValue(true);
    (useDictionary as vi.Mock).mockReturnValue({ docs: { docs: "Documentation" } });

    render(<DocsComponent />);

    expect(screen.getByAltText("Docs Icon")).toBeInTheDocument();
  });
});
