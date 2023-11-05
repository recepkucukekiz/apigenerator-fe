'use client';

import React from 'react';
import Head from 'next/head';
import Login from '../../../components/Login';

export default function LoginPage() {
    return (
        <div>
          <Head>
            <title>Login</title>
          </Head>
          <Login />
        </div>
      );
}