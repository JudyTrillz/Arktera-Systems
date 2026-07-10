/**
 * Generic database helpers.
 */

export async function insertRecord<T>(
  supabase: any,
  table: string,
  data: Record<string, unknown>,
): Promise<T> {
  const { data: result, error } = await supabase
    .from(table)
    .insert(data)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return result as T;
}

export async function updateRecord<T>(
  supabase: any,
  table: string,
  id: string,
  data: Record<string, unknown>,
): Promise<T> {
  const { data: result, error } = await supabase
    .from(table)
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return result as T;
}

export async function findRecord<T>(
  supabase: any,
  table: string,
  column: string,
  value: unknown,
): Promise<T | null> {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq(column, value)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as T | null;
}
