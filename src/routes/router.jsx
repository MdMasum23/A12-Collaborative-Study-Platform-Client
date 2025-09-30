import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import NotFound from "../pages/Error/NotFound";
import PrivateRoute from "../provider/PrivateRoute";
import CreateSession from "../features/dashboard/Tutor/CreateSession/CreateSession";
import DashboardLayout from "../layouts/DashboardLayout";
import BookedSessions from "../features/dashboard/Student/BookedSessions/BookedSessions";
import StudySessions from "../pages/StudySessions/StudySessions";
import SessionDetails from "../features/sessions/SessionDetails";
import AllTutors from "../pages/Tutors/Tutors";
import CreateNote from "../features/dashboard/Student/CreateNote/CreateNote";
import ManageNotes from "../features/dashboard/Student/ManageNotes/ManageNotes";
import AllStudySessions from "../features/dashboard/Admin/AllStudySessions/AllStudySessions";
import AllUsers from "../features/dashboard/Admin/AllUsers/AllUsers";
import CreatedAllSessions from "../features/dashboard/Tutor/AllStudySessions/CreatedAllSessions";
import UploadMaterials from "../features/dashboard/Tutor/UploadMaterials/UploadMaterials";
import UploadAllMaterials from "../features/dashboard/Tutor/UploadAllMaterials/UploadAllMaterials";
import AllMaterials from "../features/dashboard/Admin/AllMaterials/AllMaterials";
import AllStudyMaterials from "../features/dashboard/Student/AllStudyMaterials/AllStudyMaterials";
import Forbidden from "../pages/Forbidden/Forbidden";
import AdminRoute from "../provider/AdminRoute";

export const router = createBrowserRouter([
    // Main Layout Section:
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                path: '/',
                index: true,
                Component: Home
            },
            {
                path: '/tutors',
                Component: AllTutors
            },
            {
                path: '/study-sessions',
                Component: StudySessions
            },
            {
                path: '/session/:id',
                element: <PrivateRoute>
                    <SessionDetails></SessionDetails>
                </PrivateRoute>
            },
            {
                path: '/forbidden',
                Component: Forbidden
            },
        ]
    },
    // Auth Layout Section:
    {
        path: '/auth',
        Component: AuthLayout,
        children: [
            {
                path: '/auth/login',
                Component: Login
            },
            {                 
                path: '/auth/register',
                Component: Register
            }
        ]
    },
    // Dashboard Layout Section:
    {
        path: '/dashboard',
        element:
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>,
        children: [
            // Student
            {
                path: '/dashboard/booked-sessions',
                Component: BookedSessions
            },
            {
                path: '/dashboard/create-note',
                Component: CreateNote
            },
            {
                path: '/dashboard/manage-notes',
                Component: ManageNotes
            },
            {
                path: '/dashboard/study-materials',
                Component: AllStudyMaterials
            },
            // Tutor
            {
                path: '/dashboard/create-session',
                Component: CreateSession
            },
            {
                path: '/dashboard/created-all-sessions',
                Component: CreatedAllSessions
            },
            {
                path: '/dashboard/upload-materials',
                Component: UploadMaterials
            },
            {
                path: '/dashboard/upload-all-materials',
                Component: UploadAllMaterials
            },
            // Admin
            {
                path: '/dashboard/all-sessions',
                element: <AdminRoute>
                    <AllStudySessions></AllStudySessions>
                </AdminRoute>
            },
            {
                path: '/dashboard/all-users',
                element: <AdminRoute>
                    <AllUsers></AllUsers>
                </AdminRoute>
            },
            {
                path: '/dashboard/all-materials',
                element: <AdminRoute>
                    <AllMaterials></AllMaterials>
                </AdminRoute>
            },
        ]
    },
    // 404 Page Section  
    {
        path: '*',
        Component: NotFound
    }
]);