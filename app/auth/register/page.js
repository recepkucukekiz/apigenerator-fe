'use client';

import React from 'react';
import Head from 'next/head';
import Register from '../../../components/Register';

export default function RegisterPage() {
    return (
        <div>
          <Head>
            <title>Register</title>
          </Head>
          <Register />
        </div>
      );
}