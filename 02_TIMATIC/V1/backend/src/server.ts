
import express from 'express';
import cors from 'cors';

import roleRoutes from './routes/role.routes';
import serviceParentRoutes from './routes/serviceParent.routes';
import serviceRoutes from './routes/service.routes';
import personnelRoutes from './routes/personnel.routes';
//
import documentRoutes from './routes/document.routes'
import nationaliteRoutes from './routes/nationalite.routes'
import categorieRoutes from './routes/categorie.routes'
import regimeRoutes from './routes/regime.routes'
import visaRoutes from './routes/visa.routes';
import adminRoutes from './routes/admin.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from "./routes/user.routes";


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/roles', roleRoutes);
app.use('/api/service-parents', serviceParentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/personnels', personnelRoutes);
//
app.use('/api/documents',documentRoutes)
app.use('/api/nationalites',nationaliteRoutes)
app.use('/api/categories',categorieRoutes)
app.use('/api/regimes',regimeRoutes)

app.use("/api/visa", visaRoutes);

app.use("/api/admin", adminRoutes);

app.use('/api/auth', authRoutes);

app.use("/api/users", userRoutes);

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
