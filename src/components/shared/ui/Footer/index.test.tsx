import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { Footer } from "@shared/ui/Footer";
import logo from "@public/rss-logo.svg";

describe("Footer component", () => {
  it("renders the RSSchool logo", () => {
    render(<Footer />);
    const logoElement = screen.getByAltText("RSSchool Logo");
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute("src", logo);
  });

  it("renders the developer links with correct href", () => {
    render(<Footer />);

    const developerLinks = [
      { text: "nadyavalin", href: "https://github.com/nadyavalin" },
      { text: "katika", href: "https://github.com/ifbfirst" },
      { text: "LarryDavidd", href: "https://github.com/LarryDavidd" },
    ];

    developerLinks.forEach(({ text, href }) => {
      const linkElement = screen.getByText(text);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", href);
      expect(linkElement).toHaveAttribute("target", "_blank");
      expect(linkElement).toHaveAttribute("rel", "noreferrer");
    });
  });

  it("displays the correct year", () => {
    render(<Footer />);
    const yearElement = screen.getByText("2024");
    expect(yearElement).toBeInTheDocument();
  });
});
