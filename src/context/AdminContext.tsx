'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import {
  AdminTabType,
  AdminJob,
  AdminOrder,
  Driver,
  Offer,
  RateLoad,
  RateItem,
  RateSurcharge,
  AdminProduct,
  AdminToastState,
} from '@/types';
import {
  INITIAL_JOBS,
  INITIAL_ORDERS,
  INITIAL_DRIVERS,
  INITIAL_OFFERS,
  INITIAL_LOADS,
  INITIAL_ITEMS,
  INITIAL_SURCHARGES,
  INITIAL_PRODUCTS,
} from '@/utils/adminData';

interface AdminContextType {
  isAuthenticated: boolean;
  isPreviewMode: boolean;
  currentTab: AdminTabType;
  jobs: AdminJob[];
  orders: AdminOrder[];
  drivers: Driver[];
  offers: Offer[];
  loads: RateLoad[];
  items: RateItem[];
  surcharges: RateSurcharge[];
  products: AdminProduct[];
  vatRegistered: boolean;
  tigerDelivery: number | null;
  reviewedJobRefs: Set<string>;
  toast: AdminToastState | null;
  selectedJobRef: string | null;

  urgentNowCount: number;
  urgentShopCount: number;

  login: (username: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  enterPreview: () => void;
  setCurrentTab: (tab: AdminTabType) => void;
  setSelectedJobRef: (ref: string | null) => void;
  showToast: (message: string, undoFn?: (() => void) | null) => void;
  clearToast: () => void;

  markOrderSent: (ref: string) => void;
  assignDriver: (jobRef: string, driverName: string) => void;
  markJobCollected: (jobRef: string) => void;
  markJobPaid: (jobRef: string) => void;
  tellCrewCheck: (jobRef: string) => void;
  dismissFlag: (jobRef: string) => void;

  addDriver: (name: string) => boolean;
  removeDriver: (index: number) => void;
  toggleDriver: (index: number, on: boolean) => void;
  toggleOffer: (index: number, on: boolean) => void;

  setVatRegistered: (on: boolean) => void;
  setTigerDelivery: (val: number | null) => void;
  updateProduct: (id: string, updates: Partial<AdminProduct>) => void;
  updateRateLoad: (id: string, price: number) => void;
  updateRateItem: (id: string, price: number) => void;
  updateRateSurcharge: (id: string, price: number) => void;

  publishRates: () => { success: boolean; message: string };
  publishShop: () => { success: boolean; message: string };
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<AdminTabType>('now');

  const [jobs, setJobs] = useState<AdminJob[]>(INITIAL_JOBS);
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);
  const [drivers, setDrivers] = useState<Driver[]>(INITIAL_DRIVERS);
  const [offers, setOffers] = useState<Offer[]>(INITIAL_OFFERS);
  const [loads, setLoads] = useState<RateLoad[]>(INITIAL_LOADS);
  const [items, setItems] = useState<RateItem[]>(INITIAL_ITEMS);
  const [surcharges, setSurcharges] = useState<RateSurcharge[]>(INITIAL_SURCHARGES);
  const [products, setProducts] = useState<AdminProduct[]>(INITIAL_PRODUCTS);

  const [vatRegistered, setVatRegistered] = useState<boolean>(false);
  const [tigerDelivery, setTigerDelivery] = useState<number | null>(null);
  const [reviewedJobRefs, setReviewedJobRefs] = useState<Set<string>>(new Set());

  const [toast, setToast] = useState<AdminToastState | null>(null);
  const [selectedJobRef, setSelectedJobRef] = useState<string | null>(null);

  // Check existing session on mount
  useEffect(() => {
    fetch('/api/admin/session', { credentials: 'same-origin' })
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true);
          setIsPreviewMode(false);
        }
      })
      .catch(() => {
        // server uncontactable; preview ready
      });
  }, []);

  const showToast = useCallback((message: string, undoFn?: (() => void) | null) => {
    setToast({
      id: Math.random().toString(36).substring(2, 9),
      message,
      undoFn,
    });
  }, []);

  const clearToast = useCallback(() => {
    setToast(null);
  }, []);

  const login = useCallback(
    async (username: string, pass: string): Promise<{ success: boolean; error?: string }> => {
      try {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password: pass }),
        });
        if (res.ok) {
          setIsAuthenticated(true);
          setIsPreviewMode(false);
          return { success: true };
        }
        return { success: false, error: 'That username and password didn’t match.' };
      } catch {
        // Fallback for preview demo environment
        if (username.trim() && pass.trim()) {
          setIsAuthenticated(true);
          setIsPreviewMode(true);
          return { success: true };
        }
        return {
          success: false,
          error: 'Can’t reach the server, so the console stays locked. Try again in a moment.',
        };
      }
    },
    []
  );

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setIsPreviewMode(true);
  }, []);

  const enterPreview = useCallback(() => {
    setIsAuthenticated(true);
    setIsPreviewMode(true);
  }, []);

  // Urgent counts
  const urgentShopCount = useMemo(() => orders.filter((o) => !o.sent).length, [orders]);

  const urgentNowCount = useMemo(() => {
    const shop = urgentShopCount;
    const under = jobs.filter((j) => j.flag && !reviewedJobRefs.has(j.ref) && !j.done).length;
    const unassigned = jobs.filter((j) => j.day === 'Today' && !j.driver && !j.done).length;
    return shop + under + unassigned;
  }, [jobs, reviewedJobRefs, urgentShopCount]);

  // Operations actions
  const markOrderSent = useCallback(
    (ref: string) => {
      const order = orders.find((o) => o.ref === ref);
      if (!order) return;
      setOrders((prev) => prev.map((o) => (o.ref === ref ? { ...o, sent: true } : o)));
      showToast(`Order #${ref} marked as ordered`, () => {
        setOrders((prev) => prev.map((o) => (o.ref === ref ? { ...o, sent: false } : o)));
      });
    },
    [orders, showToast]
  );

  const assignDriver = useCallback(
    (jobRef: string, driverName: string) => {
      const job = jobs.find((j) => j.ref === jobRef);
      if (!job) return;
      const oldDriver = job.driver;
      setJobs((prev) => prev.map((j) => (j.ref === jobRef ? { ...j, driver: driverName } : j)));
      showToast(
        driverName ? `${driverName} assigned to ${job.cust}` : `Driver removed from ${job.cust}`,
        () => {
          setJobs((prev) => prev.map((j) => (j.ref === jobRef ? { ...j, driver: oldDriver } : j)));
        }
      );
    },
    [jobs, showToast]
  );

  const markJobCollected = useCallback(
    (jobRef: string) => {
      const job = jobs.find((j) => j.ref === jobRef);
      if (!job) return;
      setJobs((prev) => prev.map((j) => (j.ref === jobRef ? { ...j, done: true } : j)));
      showToast(`${job.cust} marked as collected`, () => {
        setJobs((prev) => prev.map((j) => (j.ref === jobRef ? { ...j, done: false } : j)));
      });
    },
    [jobs, showToast]
  );

  const markJobPaid = useCallback(
    (jobRef: string) => {
      const job = jobs.find((j) => j.ref === jobRef);
      if (!job) return;
      setJobs((prev) => prev.map((j) => (j.ref === jobRef ? { ...j, paid: true } : j)));
      showToast(`${job.cust} marked as paid`, () => {
        setJobs((prev) => prev.map((j) => (j.ref === jobRef ? { ...j, paid: false } : j)));
      });
    },
    [jobs, showToast]
  );

  const tellCrewCheck = useCallback(
    (jobRef: string) => {
      const job = jobs.find((j) => j.ref === jobRef);
      if (!job) return;
      setReviewedJobRefs((prev) => new Set(prev).add(jobRef));
      showToast(`Crew will check ${job.cust}'s load on arrival`, () => {
        setReviewedJobRefs((prev) => {
          const next = new Set(prev);
          next.delete(jobRef);
          return next;
        });
      });
    },
    [jobs, showToast]
  );

  const dismissFlag = useCallback(
    (jobRef: string) => {
      const job = jobs.find((j) => j.ref === jobRef);
      if (!job) return;
      setReviewedJobRefs((prev) => new Set(prev).add(jobRef));
      showToast(`Flag cleared for ${job.cust}`, () => {
        setReviewedJobRefs((prev) => {
          const next = new Set(prev);
          next.delete(jobRef);
          return next;
        });
      });
    },
    [jobs, showToast]
  );

  // Setup management
  const addDriver = useCallback(
    (name: string): boolean => {
      const clean = name.trim();
      if (!clean) return false;
      if (drivers.some((d) => d.name.toLowerCase() === clean.toLowerCase())) {
        showToast(`${clean} is already on the list`);
        return false;
      }
      setDrivers((prev) => [...prev, { name: clean, on: true }]);
      showToast(`${clean} added to drivers`);
      return true;
    },
    [drivers, showToast]
  );

  const removeDriver = useCallback(
    (index: number) => {
      const target = drivers[index];
      if (!target) return;
      setDrivers((prev) => prev.filter((_, i) => i !== index));
      setJobs((prev) =>
        prev.map((j) => (j.driver === target.name ? { ...j, driver: '' } : j))
      );
      showToast(`${target.name} removed`, () => {
        setDrivers((prev) => {
          const next = [...prev];
          next.splice(index, 0, target);
          return next;
        });
      });
    },
    [drivers, showToast]
  );

  const toggleDriver = useCallback((index: number, on: boolean) => {
    setDrivers((prev) => prev.map((d, i) => (i === index ? { ...d, on } : d)));
  }, []);

  const toggleOffer = useCallback((index: number, on: boolean) => {
    setOffers((prev) => prev.map((o, i) => (i === index ? { ...o, on } : o)));
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<AdminProduct>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }, []);

  const updateRateLoad = useCallback((id: string, price: number) => {
    setLoads((prev) => prev.map((l) => (l.id === id ? { ...l, price } : l)));
  }, []);

  const updateRateItem = useCallback((id: string, price: number) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, price } : it)));
  }, []);

  const updateRateSurcharge = useCallback((id: string, price: number) => {
    setSurcharges((prev) => prev.map((s) => (s.id === id ? { ...s, price } : s)));
  }, []);

  const publishRates = useCallback(() => {
    showToast('Rate card saved. Changes live when connected to backend.');
    return { success: true, message: 'Rate card published' };
  }, [showToast]);

  const publishShop = useCallback(() => {
    showToast('Shop prices and costs saved. Changes live when connected to backend.');
    return { success: true, message: 'Shop prices published' };
  }, [showToast]);

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        isPreviewMode,
        currentTab,
        jobs,
        orders,
        drivers,
        offers,
        loads,
        items,
        surcharges,
        products,
        vatRegistered,
        tigerDelivery,
        reviewedJobRefs,
        toast,
        selectedJobRef,
        urgentNowCount,
        urgentShopCount,
        login,
        logout,
        enterPreview,
        setCurrentTab,
        setSelectedJobRef,
        showToast,
        clearToast,
        markOrderSent,
        assignDriver,
        markJobCollected,
        markJobPaid,
        tellCrewCheck,
        dismissFlag,
        addDriver,
        removeDriver,
        toggleDriver,
        toggleOffer,
        setVatRegistered,
        setTigerDelivery,
        updateProduct,
        updateRateLoad,
        updateRateItem,
        updateRateSurcharge,
        publishRates,
        publishShop,
      }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return ctx;
}
