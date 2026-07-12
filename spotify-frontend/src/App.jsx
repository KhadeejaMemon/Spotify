import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Library from "./pages/Library";
import Search from "./pages/Search";
import Playlist from "./pages/Playlist";
import PlaylistDetails from "./pages/PlaylistDetails";

import Album from "./pages/Album";
import AlbumDetail from "./pages/AlbumDetail";

import Artist from "./pages/Artists";
import ArtistDetail from "./pages/ArtistsDetails";

import Profile from "./pages/Profile";
import History from "./pages/History";
import LikedSongs from "./pages/LikedSongs";


import AdminRoute from "./components/AdminRoute";

import AdminLayout from "./layouts/AdminLayout";

import Dashboard from "./pages/Dashboard";
import Songs from "./pages/Songs";
import Albums from "./pages/Albums";
import Artistss from "./pages/Artistss";
import Users from "./pages/Users";
import AddSong from "./pages/AddSong";

import EditSong from "./pages/EditSong";
import AddAlbum from "./pages/AddAlbum";
import EditAlbum from "./pages/EditAlbum";
import AddArtist from "./pages/AddArtist";
import EditArtist from "./pages/EditArtist";
function App() {

  return (

    <Routes>


      {/* AUTH */}

      <Route 
        path="/login" 
        element={<Login />} 
      />


      <Route 
        path="/register" 
        element={<Register />} 
      />




      {/* HOME - PUBLIC */}

      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />




      {/* SEARCH - PUBLIC */}

      <Route
        path="/search"
        element={
          <MainLayout>
            <Search />
          </MainLayout>
        }
      />




      {/* LIBRARY - PROTECTED */}

      <Route
        path="/library"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Library />
            </MainLayout>
          </ProtectedRoute>
        }
      />




      {/* PLAYLIST - PROTECTED */}

      <Route
        path="/playlists"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Playlist />
            </MainLayout>
          </ProtectedRoute>
        }
      />



      {/* SINGLE PLAYLIST */}

      <Route
        path="/playlist/:id"
        element={
          <ProtectedRoute>
            <MainLayout>
              <PlaylistDetails />
            </MainLayout>
          </ProtectedRoute>
        }
      />




      {/* PROFILE - PROTECTED */}

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Profile />
            </MainLayout>
          </ProtectedRoute>
        }
      />




      {/* HISTORY - PROTECTED */}

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <MainLayout>
              <History />
            </MainLayout>
          </ProtectedRoute>
        }
      />




      {/* ALBUMS */}

      <Route
        path="/albums"
        element={
          <MainLayout>
            <Album />
          </MainLayout>
        }
      />


      <Route
        path="/albums/:id"
        element={
          <MainLayout>
            <AlbumDetail />
          </MainLayout>
        }
      />




      {/* ARTISTS */}

      <Route
        path="/artists"
        element={
          <MainLayout>
            <Artist />
          </MainLayout>
        }
      />


      <Route
        path="/artists/:id"
        element={
          <MainLayout>
            <ArtistDetail />
          </MainLayout>
        }
      />


<Route
 path="/liked"
 element={
   <ProtectedRoute>
     <MainLayout>
       <LikedSongs/>
     </MainLayout>
   </ProtectedRoute>
 }
/>

<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminLayout>
        <Dashboard />
      </AdminLayout>
    </AdminRoute>
  }
/>
<Route
  path="/admin/songs"
  element={
    <AdminRoute>
      <AdminLayout>
        <Songs />
      </AdminLayout>
    </AdminRoute>
  }
/>

<Route
  path="/admin/albums"
  element={
    <AdminRoute>
      <AdminLayout>
        <Albums />
      </AdminLayout>
    </AdminRoute>
  }
/>

<Route
  path="/admin/artists"
  element={
    <AdminRoute>
      <AdminLayout>
        <Artistss />
      </AdminLayout>
    </AdminRoute>
  }
/>

<Route
  path="/admin/users"
  element={
    <AdminRoute>
      <AdminLayout>
        <Users />
      </AdminLayout>
    </AdminRoute>
  }
/>

<Route
  path="/admin/songs/add"
  element={
    <AdminRoute>
      <AdminLayout>
        <AddSong />
      </AdminLayout>
    </AdminRoute>
  }
/>

<Route
  path="/admin/songs/edit/:id"
  element={
    <AdminRoute>
      <AdminLayout>
        <EditSong />
      </AdminLayout>
    </AdminRoute>
  }
/>

<Route
  path="/admin/albums/add"
  element={
    <AdminRoute>
      <AdminLayout>
        <AddAlbum />
      </AdminLayout>
    </AdminRoute>
  }
/>

<Route
  path="/admin/albums/edit/:id"
  element={
    <AdminRoute>
      <AdminLayout>
        <EditAlbum />
      </AdminLayout>
    </AdminRoute>
  }
/>

<Route
  path="/admin/artists/add"
  element={
    <AdminRoute>
      <AdminLayout>
        <AddArtist />
      </AdminLayout>
    </AdminRoute>
  }
/>

<Route
  path="/admin/artists/edit/:id"
  element={
    <AdminRoute>
      <AdminLayout>
        <EditArtist />
      </AdminLayout>
    </AdminRoute>
  }
/>
    </Routes>

  );

}


export default App;