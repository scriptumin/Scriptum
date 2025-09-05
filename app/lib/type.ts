
// app/lib/types.ts
// Scriptum Supabase Database Types
// Keeps app in sync with Supabase tables.

export type UserExt = {
user_id: string
email: string | null
name: string | null
plan: 'free' | 'pro' | 'elite'
region: string
is_admin: boolean
created_at: string
}

export type Subscription = {
user_id: string
plan: string
region: string
started_at: string
expires_at: string | null
status: 'active' | 'expired' | 'canceled'
}

export type Payment = {
id: number
user_id: string
provider: string
amount: number
currency: string
purpose: string
gateway_ref: string | null
status: 'created' | 'paid' | 'failed' | 'refunded'
created_at: string
}

export type Project = {
id: number
user_id: string
title: string
script: string | null
platform: string | null
backend: string | null
preview_type: 'video' | 'image'
status: 'draft' | 'queued' | 'ready' | 'error'
output_url: string | null
created_at: string
}

export type FeatureRequest = {
id: number
user_id: string | null
title: string
details: string | null
votes: number
status: 'open' | 'in-progress' | 'done' | 'rejected'
created_at: string
}
