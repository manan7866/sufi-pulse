from db.connection import DBConnection
from sql.combinedQueries import Queries

conn = DBConnection.get_connection()
db = Queries(conn)

print("=" * 80)
print("TESTING DATABASE FOR RECORDING REQUEST DROPDOWN")
print("=" * 80)

# Test 1: Check all kalams with vocalist_id assigned
print("\n1. Kalams with vocalist_id assigned:")
with conn.cursor() as cur:
    cur.execute("""
        SELECT k.id, k.title, k.vocalist_id, ks.status, v.user_id as vocalist_user_id
        FROM kalams k
        LEFT JOIN kalam_submissions ks ON ks.kalam_id = k.id
        LEFT JOIN vocalists v ON k.vocalist_id = v.id
        WHERE k.vocalist_id IS NOT NULL
        ORDER BY k.created_at DESC
        LIMIT 10
    """)
    results = cur.fetchall()
    for r in results:
        print(f"   ID={r[0]}, Title='{r[1]}', Vocalist ID={r[2]}, Status='{r[3]}', Vocalist User ID={r[4]}")

# Test 2: Check final_approved and complete_approved kalams
print("\n2. Kalams with final_approved or complete_approved status:")
with conn.cursor() as cur:
    cur.execute("""
        SELECT k.id, k.title, k.vocalist_id, ks.status
        FROM kalams k
        LEFT JOIN kalam_submissions ks ON ks.kalam_id = k.id
        WHERE ks.status IN ('final_approved', 'complete_approved')
        ORDER BY k.created_at DESC
        LIMIT 10
    """)
    results = cur.fetchall()
    for r in results:
        print(f"   ID={r[0]}, Title='{r[1]}', Vocalist ID={r[2]}, Status='{r[3]}'")

# Test 3: Check recording request tables structure
print("\n3. Recording request tables columns:")
with conn.cursor() as cur:
    cur.execute("""
        SELECT table_name, column_name, data_type
        FROM information_schema.columns
        WHERE table_name IN ('studio_recording_requests', 'remote_recording_requests_new')
        AND column_name IN ('kalam_id', 'blog_id', 'vocalist_id')
        ORDER BY table_name, ordinal_position
    """)
    results = cur.fetchall()
    for r in results:
        print(f"   {r[0]}.{r[1]}: {r[2]}")

# Test 4: Run the exact query from fetch_approved_kalams_for_vocalist
print("\n4. Testing fetch_approved_kalams_for_vocalist query:")
with conn.cursor() as cur:
    cur.execute("""
        SELECT
            k.id,
            k.title,
            k.language,
            k.theme AS category,
            ks.status,
            ks.vocalist_approval_status,
            k.vocalist_id,
            v.user_id as assigned_vocalist_user_id
        FROM kalams k
        JOIN users u ON k.writer_id = u.id
        LEFT JOIN kalam_submissions ks ON ks.kalam_id = k.id
        INNER JOIN vocalists v ON k.vocalist_id = v.id
        WHERE ks.status IN ('final_approved', 'complete_approved')
          AND k.vocalist_id IS NOT NULL
        ORDER BY k.created_at DESC
    """)
    results = cur.fetchall()
    print(f"   Found {len(results)} kalams")
    for r in results:
        print(f"   ID={r[0]}, Title='{r[1]}', Status='{r[4]}', Vocalist User ID={r[7]}")

print("\n" + "=" * 80)
print("TEST COMPLETE")
print("=" * 80)
