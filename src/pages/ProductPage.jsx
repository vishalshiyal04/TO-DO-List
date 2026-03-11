// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts, deleteProduct, updateProduct } from '../redux/slices/productSlice';

// const ProductsPage = () => {
//   const dispatch = useDispatch();
//   const { items, loading, error } = useSelector((state) => state.products);
//   const totalRecords = items.length;

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   if (loading) return <p>Loading products...</p>;
//   if (error) return <p>Error fetching products: {error}</p>;

//   const handleDelete = (productId) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       dispatch(deleteProduct(productId));
//     }
//   };

//   const handleEdit = (product) => {
//     const newTitle = prompt("Enter new title:", product.title);
//     if (newTitle) {
//       const updatedProductData = {
//         ...product,
//         title: newTitle,
//       };
//       dispatch(updateProduct(updatedProductData));
//     }
//   };

//   return (
//     <div>
//       <h2>Products List</h2>
//       <p>Total Records: {totalRecords}</p>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Title</th>
//             <th>Price</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((product) => (
//             <tr key={product.id}>
//               <td>{product.id}</td>
//               <td>{product.title}</td>
//               <td>${product.price}</td>
//               <td>
//                 <button onClick={() => handleEdit(product)}>Edit</button>
//                 <button onClick={() => handleDelete(product.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProductsPage;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct, updateProduct } from '../redux/slices/productSlice';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const totalRecords = items.length;

  useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(productId));
    }
  };

  const handleEditOpen = (product) => {
    setEditingProduct(product);
    setEditTitle(product.title);
  };

  const handleEditSave = () => {
    if (editTitle.trim()) {
      dispatch(updateProduct({ ...editingProduct, title: editTitle }));
      setEditingProduct(null);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;600;700&display=swap');

        @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { left: -100%; } 100% { left: 200%; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:0.05; } 50% { opacity:0.1; } }
        @keyframes gridScroll { 0% { background-position: 0 0; } 100% { background-position: 40px 40px; } }
        @keyframes rowIn { from { opacity:0; transform:translateX(-10px); } to { opacity:1; transform:translateX(0); } }

        .pp-root {
          min-height: 100vh;
          background: #07070f;
          font-family: 'Share Tech Mono', monospace;
          color: #cffafe;
          position: relative;
          overflow-x: hidden;
          padding: 40px 24px;
        }
        .pp-grid {
          position: fixed; inset: 0; pointer-events: none;
          background-image: linear-gradient(rgba(0,240,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,240,255,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridScroll 20s linear infinite;
        }
        .pp-orb1 { position:fixed; top:10%; left:5%; width:400px; height:400px; background:#00f0ff; border-radius:50%; filter:blur(100px); animation:pulse 5s ease-in-out infinite; pointer-events:none; }
        .pp-orb2 { position:fixed; bottom:10%; right:5%; width:500px; height:500px; background:#7c3aed; border-radius:50%; filter:blur(120px); animation:pulse 7s ease-in-out infinite; pointer-events:none; }

        .pp-inner { position:relative; z-index:10; max-width: 1100px; margin: 0 auto; animation: fadeIn 0.5s ease both; }

        .pp-header { margin-bottom: 32px; }
        .pp-title { font-family:'Rajdhani',sans-serif; font-weight:700; font-size:28px; letter-spacing:0.3em; text-transform:uppercase; color:#fff; }
        .pp-title span { color:#00f0ff; }
        .pp-meta { font-size:11px; letter-spacing:0.2em; color:rgba(0,240,255,0.4); margin-top:6px; text-transform:uppercase; }
        .pp-meta strong { color:#00f0ff; }

        .pp-card { background:rgba(10,10,22,0.95); border:1px solid rgba(0,240,255,0.12); box-shadow:0 0 60px rgba(0,240,255,0.04); overflow:hidden; }
        .pp-accent { height:2px; background:linear-gradient(90deg,transparent,#00f0ff,transparent); }
        .pp-accent-bottom { height:2px; background:linear-gradient(90deg,transparent,#7c3aed,transparent); }

        .pp-table { width:100%; border-collapse:collapse; }
        .pp-table thead tr { border-bottom:1px solid rgba(0,240,255,0.1); }
        .pp-table th {
          padding:14px 20px; text-align:left;
          font-size:10px; letter-spacing:0.25em; text-transform:uppercase;
          color:rgba(0,240,255,0.5); font-weight:400;
        }
        .pp-table tbody tr {
          border-bottom:1px solid rgba(0,240,255,0.05);
          transition:background 0.2s;
          animation: rowIn 0.3s ease both;
        }
        .pp-table tbody tr:hover { background:rgba(0,240,255,0.04); }
        .pp-table td { padding:14px 20px; font-size:13px; color:rgba(207,250,254,0.85); }
        .pp-id { color:rgba(0,240,255,0.35); font-size:11px; }
        .pp-price { color:#34d399; font-weight:600; }

        .btn { position:relative; overflow:hidden; border:1px solid; padding:7px 16px; font-family:'Share Tech Mono',monospace; font-size:11px; letter-spacing:0.15em; text-transform:uppercase; cursor:pointer; transition:all 0.25s; background:transparent; }
        .btn .shimmer { position:absolute; top:0;bottom:0;width:50%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent); animation:shimmer 2s ease-in-out infinite; }
        .btn-edit { border-color:rgba(0,240,255,0.3); color:#67e8f9; margin-right:8px; }
        .btn-edit:hover { border-color:#00f0ff; color:#fff; background:rgba(0,240,255,0.08); }
        .btn-delete { border-color:rgba(239,68,68,0.3); color:#fca5a5; }
        .btn-delete:hover { border-color:#ef4444; color:#fff; background:rgba(239,68,68,0.08); }

        .pp-loading { display:flex; align-items:center; gap:12px; color:rgba(0,240,255,0.6); font-size:13px; letter-spacing:0.2em; padding:60px; justify-content:center; }
        .spinner { width:18px;height:18px;border:2px solid rgba(0,240,255,0.2);border-top-color:#00f0ff;border-radius:50%;animation:spin 0.8s linear infinite; }
        .pp-error { color:#fca5a5; padding:40px; text-align:center; font-size:13px; letter-spacing:0.1em; }

        /* Modal */
        .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.7); backdrop-filter:blur(4px); z-index:100; display:flex; align-items:center; justify-content:center; animation:fadeIn 0.2s ease; }
        .modal { background:#0a0a16; border:1px solid rgba(0,240,255,0.2); padding:36px; width:100%; max-width:420px; box-shadow:0 0 60px rgba(0,240,255,0.1); }
        .modal-title { font-family:'Rajdhani',sans-serif; font-weight:700; font-size:16px; letter-spacing:0.25em; text-transform:uppercase; color:#fff; margin-bottom:20px; }
        .modal-title span { color:#00f0ff; }
        .modal-input { width:100%; background:#080810; border:1px solid rgba(0,240,255,0.2); color:#cffafe; padding:11px 14px; font-family:'Share Tech Mono',monospace; font-size:13px; letter-spacing:0.08em; outline:none; transition:border-color 0.3s; }
        .modal-input:focus { border-color:rgba(0,240,255,0.6); }
        .modal-actions { display:flex; gap:10px; margin-top:20px; justify-content:flex-end; }
        .btn-save { border-color:rgba(0,240,255,0.4); color:#67e8f9; }
        .btn-save:hover { border-color:#00f0ff; color:#fff; background:rgba(0,240,255,0.1); }
        .btn-cancel { border-color:rgba(255,255,255,0.1); color:rgba(255,255,255,0.4); }
        .btn-cancel:hover { border-color:rgba(255,255,255,0.3); color:#fff; }
      `}</style>

      <div className="pp-root">
        <div className="pp-grid" />
        <div className="pp-orb1" />
        <div className="pp-orb2" />

        <div className="pp-inner">
          <div className="pp-header">
            <div className="pp-title"><span style={{fontSize:'18px',opacity:0.5}}>/ Products</span></div>
            <div className="pp-meta">Total Records: <strong>{totalRecords}</strong></div>
          </div>

          <div className="pp-card">
            <div className="pp-accent" />

            {loading ? (
              <div className="pp-loading"><div className="spinner" /> Loading products...</div>
            ) : error ? (
              <div className="pp-error">⚠ Error fetching products: {error}</div>
            ) : (
              <table className="pp-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((product, i) => (
                    <tr key={product.id} style={{ animationDelay: `${i * 40}ms` }}>
                      <td className="pp-id">#{product.id}</td>
                      <td>{product.title}</td>
                      <td className="pp-price">${product.price}</td>
                      <td>
                        <button className="btn btn-edit" onClick={() => handleEditOpen(product)}>
                          <span className="shimmer" /> ✎ Edit
                        </button>
                        <button className="btn btn-delete" onClick={() => handleDelete(product.id)}>
                          <span className="shimmer" /> ✕ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="pp-accent-bottom" />
          </div>
        </div>

        {/* Edit Modal */}
        {editingProduct && (
          <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setEditingProduct(null)}>
            <div className="modal">
              <div className="modal-title">✎ Edit <span>Product</span></div>
              <input
                className="modal-input"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Enter new title"
                autoFocus
              />
              <div className="modal-actions">
                <button className="btn btn-cancel" onClick={() => setEditingProduct(null)}>Cancel</button>
                <button className="btn btn-save" onClick={handleEditSave}>Save Changes</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsPage;