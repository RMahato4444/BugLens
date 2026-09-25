import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useAuth } from "../context/AuthContext";

import Navbar from "../components/navigation/Navbar";

import HomePage from "../pages/HomePage";
import AnalysisPage from "../pages/AnalysisPage";
import HistoryPage from "../pages/HistoryPage";
import DocsPage from "../pages/DocsPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";

import LogoutAnimation from "../components/common/LogoutAnimation";

function getInitialView() {
  const path = window.location.pathname;

  if (path === "/reset-password") {
    return "reset-password";
  }

  return "home";
}

function AppRouter() {
  const {
    isAuthenticated,
    isLoading: authLoading,
  } = useAuth();

  const [view, setView] =
    useState(getInitialView);

  const [analysisInput, setAnalysisInput] =
    useState({
      errorText: "",
      selectedFile: null,
      filePreview: null,
    });

  const [analysisResult, setAnalysisResult] =
    useState(null);

  const [searchTarget, setSearchTarget] =
    useState(null);

  /* =========================================================
     Logout animation
     ========================================================= */

  const previousAuthRef =
    useRef(isAuthenticated);

  const [
    showLogoutAnimation,
    setShowLogoutAnimation,
  ] = useState(false);

  const logoutTimerRef =
    useRef(null);

  /* =========================================================
     Navigation
     ========================================================= */

  const navigateTo = (destination) => {
    setView(destination);
    setSearchTarget(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goHome = () =>
    navigateTo("home");

  const goHistory = () =>
    navigateTo("history");

  const goDocs = () =>
    navigateTo("docs");

  const goLogin = () =>
    navigateTo("login");

  const goSignup = () =>
    navigateTo("signup");

  const goForgotPassword = () =>
    navigateTo("forgot-password");

  const goResetPassword = () =>
    navigateTo("reset-password");

  /* =========================================================
     Universal Search Navigation
     ========================================================= */

  const handleSearchNavigation = ({
    view: destination,
    targetId = null,
    historyId = null,
  }) => {
    if (
      (
        destination === "analysis" ||
        destination === "history"
      ) &&
      !isAuthenticated
    ) {
      goLogin();
      return;
    }

    setSearchTarget({
      view: destination,
      targetId,
      historyId,
      createdAt: Date.now(),
    });

    setView(destination);
  };

  /* =========================================================
     Search Target Scroll
     ========================================================= */

  useEffect(() => {
    if (
      !searchTarget ||
      searchTarget.view !== view ||
      !searchTarget.targetId
    ) {
      return undefined;
    }

    let frame = 0;
    let attempts = 0;

    const scrollToTarget = () => {
      const target =
        document.getElementById(
          searchTarget.targetId,
        );

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        setSearchTarget(null);

        return;
      }

      attempts += 1;

      if (attempts < 90) {
        frame =
          window.requestAnimationFrame(
            scrollToTarget,
          );
      } else {
        setSearchTarget(null);
      }
    };

    frame =
      window.requestAnimationFrame(
        scrollToTarget,
      );

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [searchTarget, view]);

  /* =========================================================
     Logout Detection
     ========================================================= */

  useEffect(() => {
    const wasAuthenticated =
      previousAuthRef.current;

    if (
      wasAuthenticated &&
      !isAuthenticated
    ) {
      setShowLogoutAnimation(true);

      setView("home");
      setSearchTarget(null);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      if (logoutTimerRef.current) {
        window.clearTimeout(
          logoutTimerRef.current,
        );
      }

      logoutTimerRef.current =
        window.setTimeout(() => {
          setShowLogoutAnimation(false);
        }, 1150);
    }

    previousAuthRef.current =
      isAuthenticated;

    return () => {
      if (logoutTimerRef.current) {
        window.clearTimeout(
          logoutTimerRef.current,
        );
      }
    };
  }, [isAuthenticated]);

  /* =========================================================
     Analysis Complete
     ========================================================= */

  const handleAnalysisComplete = (
    result,
  ) => {
    if (!isAuthenticated) {
      goLogin();
      return;
    }

    setAnalysisInput({
      errorText:
        result.errorText || "",

      selectedFile:
        result.selectedFile ||
        null,

      filePreview:
        result.filePreview ||
        null,
    });

    setAnalysisResult(
      result.analysis || null,
    );

    setSearchTarget(null);

    setView("analysis");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     History Scan
     ========================================================= */

  const handleOpenHistoryScan = (
    scan,
  ) => {
    if (!isAuthenticated) {
      goLogin();
      return;
    }

    setAnalysisInput({
      errorText:
        scan.inputText || "",

      selectedFile: null,

      filePreview:
        scan.filePreview ||
        null,
    });

    setAnalysisResult(
      scan.analysis || null,
    );

    setSearchTarget(null);

    setView("analysis");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     Authentication Success
     ========================================================= */

  const handleAuthSuccess = () => {
    goHome();
  };

  /* =========================================================
     Auth Loading
     ========================================================= */

  if (
    authLoading &&
    view !== "reset-password" &&
    view !== "forgot-password"
  ) {
    return (
      <div className="app-shell flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500/20 border-t-blue-600" />
      </div>
    );
  }

  /* =========================================================
     Login
     ========================================================= */

  if (view === "login") {
    return (
      <LoginPage
        onBack={goHome}
        onSignup={goSignup}
        onSuccess={handleAuthSuccess}
        onForgotPassword={
          goForgotPassword
        }
      />
    );
  }

  /* =========================================================
     Signup
     ========================================================= */

  if (view === "signup") {
    return (
      <SignupPage
        onBack={goHome}
        onLogin={goLogin}
        onSuccess={handleAuthSuccess}
      />
    );
  }

  /* =========================================================
     Forgot Password
     ========================================================= */

  if (
    view === "forgot-password"
  ) {
    return (
      <ForgotPasswordPage
        onBack={goHome}
        onLogin={goLogin}
      />
    );
  }

  /* =========================================================
     Reset Password
     ========================================================= */

  if (
    view === "reset-password"
  ) {
    return (
      <ResetPasswordPage
        onBack={goHome}
        onLogin={goLogin}
      />
    );
  }

  /* =========================================================
     Main Application
     ========================================================= */

  return (
    <div className="app-shell min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      {showLogoutAnimation && (
        <LogoutAnimation />
      )}

      <div className="mx-auto max-w-7xl">
        <Navbar
          currentView={view}
          onNavigate={(destination) => {
            if (
              destination === "home"
            ) {
              goHome();
            }

            if (
              destination === "history"
            ) {
              if (isAuthenticated) {
                goHistory();
              } else {
                goLogin();
              }
            }

            if (
              destination === "docs"
            ) {
              goDocs();
            }

            if (
              destination === "login"
            ) {
              goLogin();
            }

            if (
              destination === "signup"
            ) {
              goSignup();
            }
          }}
          onLogin={goLogin}
          onSignup={goSignup}
          onSearchNavigate={
            handleSearchNavigation
          }
        />

        {view === "home" && (
          <HomePage
            onAnalyze={
              handleAnalysisComplete
            }
            onLogin={goLogin}
          />
        )}

        {view === "analysis" &&
          isAuthenticated && (
            <AnalysisPage
              analysis={
                analysisResult
              }
              inputText={
                analysisInput.errorText
              }
              selectedFile={
                analysisInput.selectedFile
              }
              filePreview={
                analysisInput.filePreview
              }
              onBack={goHome}
              onBackHistory={
                goHistory
              }
            />
          )}

        {view === "history" && (
          <HistoryPage
            onOpenScan={
              handleOpenHistoryScan
            }
            onLogin={goLogin}
          />
        )}

        {view === "docs" && (
          <DocsPage />
        )}
      </div>
    </div>
  );
}

export default AppRouter;