type GetPaginationMetaProps = {
  total: number;
  page: number;
  limit: number;
}
export function getPaginationMeta({ total, limit, page }: GetPaginationMetaProps){
  const lastPage = Math.ceil(total / limit);

  return {
    total: total,
    current_page: page,
    per_page: limit,
    last_page: lastPage
  };
}
