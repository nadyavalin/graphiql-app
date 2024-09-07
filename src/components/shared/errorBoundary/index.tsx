"use client";

import { useDictionary } from "@shared/providers/DictionaryProvider";
import React, { ReactNode, ErrorInfo } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    console.log("Error caught by ErrorBoundary in getDerivedStateFromError:", error);
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log("Error caught by ErrorBoundary in componentDidCatch:", error, errorInfo);
    this.setState({ error, errorInfo });
    if (errorInfo.componentStack) {
      console.log("Error component stack:", errorInfo.componentStack);
    }
  }

  dictionary = useDictionary();
  render() {
    if (this.state.errorInfo) {
      return (
        <h1 className="error-message">
          Something went wrong: <br />
          <b>
            <u>{this.state.error && this.state.error.toString()}</u>
          </b>
        </h1>
      );
    }
    return this.props.children;
  }
}
