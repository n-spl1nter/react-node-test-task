'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { withProtectedPage } from '@/features/protected/view/with-protected-page';

function DashboardPage() {
  return (
    <div>
      DashboardPage  1
    </div>
  );
}

export default withProtectedPage(DashboardPage);
